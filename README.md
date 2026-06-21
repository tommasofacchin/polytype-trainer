# Polytype Trainer

Vocabulary trainer for language drills with a static frontend and a Firebase
backend for progression, streaks, streak freezes, and social features.

## Current scope

- Frontend: plain HTML, CSS, and JavaScript.
- Decks: CSV files loaded by the browser.
- Backend: Firebase Auth, Firestore, and Cloud Functions.
- App language: English or Italian, selected from the profile page.
- Current languages:
  - Chinese, 60 unlock levels with 5 words per level
  - German, 60 unlock levels with 5 words per level
  - Italian, 60 unlock levels with 5 words per level
  - Japanese, 60 unlock levels with 5 words per level
  - Norwegian, 60 unlock levels with 5 words per level
  - Spanish, 60 unlock levels with 5 words per level
  - Swedish, 60 unlock levels with 5 words per level

## Run the static frontend

Serve the folder with any static server:

```bash
python -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

Opening `index.html` directly with `file://` is not recommended because browsers
usually block CSV loading from local files.

## Firebase backend

The Firebase scaffold lives in:

```txt
firebase.json
firestore.rules
firestore.indexes.json
functions/
```

Server-side logic is implemented as callable Cloud Functions in
`functions/index.js`. Clients authenticate with Firebase Auth, then call the
functions; direct writes to progression and social documents are blocked by
Firestore rules.

XP and course level are server-owned. The frontend auto-saves signed-in
practice progress every 5 answered words and again when a timed session ends or
the player restarts. Course XP and unlock level are tracked per language: level
5 in Norwegian does not unlock words or XP in Chinese, German, or any other
course. Each active course unlocks 5 new words for each course level.

Available callable functions:

- `ensureUserProfile`: creates or refreshes `users/{uid}` and
  `publicProfiles/{uid}` after sign-in.
- `setUserHandle`: reserves a unique username.
- `completePracticeSession`: updates XP, course level, daily stats, streaks,
  and streak freezes in one transaction.
- `grantStreakFreeze`: adds one freeze up to the user's cap.
- `sendFriendRequest`: creates a pending friend request.
- `respondFriendRequest`: accepts or declines a request.
- `removeFriend`: removes friendship on both users.

Install and run the backend locally:

```bash
cd functions
npm install
npm run serve
```

For local auth testing, `js/firebase-config.js` is already configured for the
demo project id `demo-polytype-trainer-dev` and automatically uses the Firebase
emulators on `localhost`.

After the emulators start, open:

```txt
http://localhost:5000
```

Open `auth.html` from the header link, then switch between `Sign in` and
`Register` on the same page. Use `Sign in` with the same email and password
later to recover the account.

Local emulator users appear only in:

```txt
http://localhost:4000/auth
```

They do not appear in the real Firebase Console.

Deploy backend and Firestore rules:

```bash
cd functions
npm run deploy
```

## Generate word audio

One-off audio generation reads a deck CSV, creates speech with ElevenLabs, and
uploads MP3 files to Storj using its S3-compatible API. Put secrets in
`.env.local`:

```txt
ELEVENLABS_API_KEY=your-elevenlabs-api-key
ELEVENLABS_VOICE_NAME=Mia Starset- Clear and Friendly
ELEVENLABS_LANGUAGE_CODE=
ELEVENLABS_CHINESE_VOICE_ID=bhJUNIXWQQ94l8eI2VUf
ELEVENLABS_GERMAN_VOICE_ID=qAVuy3NdMTW0CZ8uA7M9
ELEVENLABS_ITALIAN_VOICE_ID=BZc8d1MPTdZkyGbE9Sin
ELEVENLABS_JAPANESE_VOICE_ID=WQz3clzUdMqvBf0jswZQ
ELEVENLABS_SPANISH_VOICE_ID=ajOR9IDAaubDK5qtLUqQ
ELEVENLABS_SWEDISH_VOICE_ID=1Iztu4UHnTb9SUjJcpS1
STORJ_ENDPOINT=https://gateway.storjshare.io
STORJ_REGION=us-east-1
STORJ_ACCESS_KEY_ID=your-storj-access-key
STORJ_SECRET_ACCESS_KEY=your-storj-secret-key
STORJ_BUCKET=your-storj-bucket
AUDIO_BASE_URL=https://your-public-audio-base-url
AUDIO_PREFIX=audio/v1
PROFILE_IMAGE_BASE_URL=https://your-public-profile-image-base-url
PROFILE_IMAGE_PREFIX=profiles/v1
```

Preview without generating audio:

```bash
npm run generate:audio:all -- --dry-run --limit=5
npm run generate:audio:chinese -- --dry-run --limit=5
npm run generate:audio:german -- --dry-run --limit=5
npm run generate:audio:italian -- --dry-run --limit=5
npm run generate:audio:japanese -- --dry-run --limit=5
npm run generate:audio:norwegian -- --dry-run --limit=5
npm run generate:audio:spanish -- --dry-run --limit=5
npm run generate:audio:swedish -- --dry-run --limit=5
```

Generate and upload missing audio:

```bash
npm run generate:audio:all
npm run generate:audio:chinese
npm run generate:audio:german
npm run generate:audio:italian
npm run generate:audio:japanese
npm run generate:audio:norwegian
npm run generate:audio:spanish
npm run generate:audio:swedish
```

`generate:audio:all` runs every active deck from `decks/index.js` in sequence
and forwards extra options such as `--dry-run`, `--limit=5`, `--force`, or
`--continue-on-error`.

Files are saved as:

```txt
{STORJ_BUCKET}/audio/v1/norwegian-a1/nor_001.mp3
{STORJ_BUCKET}/audio/v1/chinese-a1/zh_001.mp3
{STORJ_BUCKET}/audio/v1/german-a1/de_001.mp3
{STORJ_BUCKET}/audio/v1/italian-a1/it_001.mp3
{STORJ_BUCKET}/audio/v1/japanese-a1/ja_001.mp3
{STORJ_BUCKET}/audio/v1/spanish-a1/es_001.mp3
{STORJ_BUCKET}/audio/v1/swedish-a1/sv_001.mp3
```

`AUDIO_BASE_URL` must be a public URL that maps to the bucket root, without a
trailing slash. The trainer builds audio URLs like:

```txt
{AUDIO_BASE_URL}/audio/v1/<deck-id>/<word_id>.mp3
```

The audio generator uses deck defaults for language codes where available
(`zh` for Chinese, `de` for German, `it` for Italian, `ja` for Japanese, `es`
for Spanish, `sv` for Swedish). Use `--language-code=...` only when you want to
override that behavior.

Each language can use a dedicated `ELEVENLABS_<LANGUAGE>_VOICE_ID`; when one is
not set, the script falls back to the built-in language default, then
`ELEVENLABS_VOICE_ID`, then `ELEVENLABS_VOICE_NAME`.

## Profile photos

Signed-in users can set a username and upload a profile photo from
`profile.html`. Photos are uploaded by the server API to Storj using the same
S3-compatible credentials as audio, then the public URL is saved on
`users/{uid}` and `publicProfiles/{uid}`.

Files are saved as:

```txt
{STORJ_BUCKET}/profiles/v1/<uid>/avatar-<timestamp>.jpg
```

Set `PROFILE_IMAGE_BASE_URL` to the public bucket root for profile images. If it
is empty, the API falls back to `AUDIO_BASE_URL`. Keep `PROFILE_IMAGE_PREFIX`
separate from `AUDIO_PREFIX` so generated word audio and user uploads do not mix.

## Vercel production

Vercel hosts only the static frontend. Firebase Auth, Firestore, and Cloud
Functions still run on Firebase, so production needs both:

1. Deploy the Firebase backend with `npm run deploy` from `functions/`.
2. Configure the frontend Firebase env vars in Vercel.

Set these Vercel environment variables in Project Settings > Environment
Variables:

```txt
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_APP_ID
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_MEASUREMENT_ID
FIREBASE_FUNCTIONS_REGION=europe-west1
FIREBASE_USE_EMULATORS=false
AUDIO_BASE_URL=https://your-public-audio-base-url
AUDIO_PREFIX=audio/v1
PROFILE_IMAGE_BASE_URL=https://your-public-profile-image-base-url
PROFILE_IMAGE_PREFIX=profiles/v1
```

Only the first four Firebase keys are required by the build script. `AUDIO_BASE_URL`
is required only if you want production flashcards to play hosted audio. You can
find the Firebase values in Firebase Console > Project settings > General > Your
apps > Web app config.

Profile photo uploads also need the server-side Storj variables in Vercel:

```txt
STORJ_ENDPOINT
STORJ_REGION
STORJ_ACCESS_KEY_ID
STORJ_SECRET_ACCESS_KEY
STORJ_BUCKET
```

Also enable Firebase Console > Authentication > Sign-in method > Email/Password,
and add your Vercel domain in Authentication > Settings > Authorized domains.

On Vercel, `npm run build` creates `dist/` and writes
`dist/js/firebase-config.js` from those environment variables. The checked-in
`js/firebase-config.js` is only the local emulator demo config.

## Firestore model

```txt
users/{uid}
users/{uid}/courses/{courseId}
users/{uid}/dailyStats/{yyyy-mm-dd}
users/{uid}/friends/{friendUid}
publicProfiles/{uid}
usernames/{handle}
friendRequests/{pairId}
activities/{activityId}
```

`users/{uid}` is private to the owner. `publicProfiles/{uid}` is readable by
signed-in users and is the safe profile surface for friend search, leaderboards,
and activity feeds.

## Deck format

Decks are CSV files. A deck can use any column names as long as `decks/index.js`
maps them to the app fields:

- `script`: the word shown to the user
- `romanization`: pinyin, romaja, romaji, or another pronunciation field
- `meaning`: the answer translation
- `italianMeaning` optional: Italian answer translation used when the app
  language is Italian
- `wordId` optional: stable word identifier
- `unlockLevel` optional: profile/course level required to unlock the word

Example registry entry:

```js
{
  id: "chinese-a1",
  language: "chinese",
  languageLabel: "Chinese",
  level: "A1",
  label: "Chinese A1",
  path: "decks/chinese_a1.csv",
  columns: {
    script: "chinese",
    romanization: "pinyin",
    meaning: "english",
    italianMeaning: "italian",
    wordId: "word_id",
    unlockLevel: "unlock_level"
  }
}
```

Active A1 decks use unlock levels:

```csv
word_id,chinese,pinyin,english,italian,unlock_level
zh_001,你好,nǐ hǎo,hello,ciao,1
zh_006,对不起,duì bu qǐ,sorry,scusa,2
```

To add a new deck:

1. Add a CSV file inside `decks/`.
2. Add one metadata object to `window.DECK_INDEX` in `decks/index.js`.
3. Reload the app.

The backend currently computes `wordsUnlocked` as `courseLevel * 5`. The
frontend reads `unlock_level` when present and filters the practice deck against
the current profile/course level.

Each active A1 deck currently has 300 rows:

```txt
60 levels x 5 words = 300 unlockable words
```

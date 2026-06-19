# Polytype Trainer

Vocabulary trainer for language drills with a static frontend and a Firebase
backend for progression, streaks, streak freezes, and social features.

## Current scope

- Frontend: plain HTML, CSS, and JavaScript.
- Decks: CSV files loaded by the browser.
- Backend: Firebase Auth, Firestore, and Cloud Functions.
- Current languages:
  - Chinese
  - Korean
  - Norwegian, 60 unlock levels with 5 words per level

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
the player restarts. Norwegian unlocks 5 new words for each course level.

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
ELEVENLABS_LANGUAGE_CODE=no
STORJ_ENDPOINT=https://gateway.storjshare.io
STORJ_REGION=us-east-1
STORJ_ACCESS_KEY_ID=your-storj-access-key
STORJ_SECRET_ACCESS_KEY=your-storj-secret-key
STORJ_BUCKET=your-storj-bucket
AUDIO_BASE_URL=https://your-public-audio-base-url
AUDIO_PREFIX=audio/v1
```

Preview without generating audio:

```bash
npm run generate:audio -- --deck=norwegian-a1 --dry-run --limit=5
```

Generate and upload missing audio:

```bash
npm run generate:audio -- --deck=norwegian-a1
```

Files are saved as:

```txt
{STORJ_BUCKET}/audio/v1/norwegian-a1/nor_001.mp3
```

`AUDIO_BASE_URL` must be a public URL that maps to the bucket root, without a
trailing slash. The trainer builds audio URLs like:

```txt
{AUDIO_BASE_URL}/audio/v1/norwegian-a1/nor_001.mp3
```

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
```

Only the first four Firebase keys are required by the build script. `AUDIO_BASE_URL`
is required only if you want production flashcards to play hosted audio. You can
find the Firebase values in Firebase Console > Project settings > General > Your
apps > Web app config.

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
- `wordId` optional: stable word identifier
- `unlockLevel` optional: profile/course level required to unlock the word

Example registry entry:

```js
{
  id: "topik1",
  language: "korean",
  languageLabel: "Korean",
  level: "TOPIK 1",
  label: "TOPIK 1",
  path: "decks/topik1.csv",
  columns: {
    script: "korean",
    romanization: "romaji",
    meaning: "english"
  }
}
```

Norwegian already uses unlock levels:

```csv
word_id,norwegian,romanization,english,unlock_level
nor_001,hei,hei,hello,1
nor_006,unnskyld,unnskyld,sorry,2
```

To add a new deck:

1. Add a CSV file inside `decks/`.
2. Add one metadata object to `window.DECK_INDEX` in `decks/index.js`.
3. Reload the app.

The backend currently computes `wordsUnlocked` as `courseLevel * 5`. The
frontend reads `unlock_level` when present and filters the practice deck against
the current profile/course level.

Norwegian currently has 300 rows:

```txt
60 levels x 5 words = 300 unlockable words
```

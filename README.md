# Polytype Trainer

Gamified vocabulary trainer: word decks, grammar lessons, streaks, a coin
shop, and friends/social features, on a static HTML/CSS/JS frontend backed by
serverless functions on Vercel.

## Current scope

- Frontend: plain HTML, CSS, and JavaScript, no framework or bundler. Pages
  cover onboarding, a dashboard, category/lesson browsing, flashcard
  practice, three drill modes (sprint, memory, dictate), a shop, profile and
  social pages, and settings.
- Content: CSV word decks per course (`decks/*.csv`), plus hand-authored
  grammar lessons and generated word categories — see
  [Deck and lesson content](#deck-and-lesson-content).
- Backend: Vercel serverless functions in `api/`, using the Firebase Admin
  SDK for Firestore and Auth verification, and Storj for audio/photo
  storage. See [Backend](#backend).
- App language: English or Italian, selected from the profile page.
- Current courses, each with 60 unlock levels of 5 words (300 words total):
  Chinese, German, Italian, Japanese, Norwegian, Spanish, Swedish.

## Run the static frontend

Serve the folder with any static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly with
`file://` is not recommended because browsers usually block CSV loading from
local files.

A plain static server is enough to browse decks and lessons, but anything
that calls `/api/...` — sign-in, saved progress, the shop, friends — needs
the backend below running too.

## Backend

The browser signs in with the Firebase Auth client SDK, then calls
`fetch('/api/<endpoint>', { headers: { Authorization: 'Bearer <idToken>' } })`
(see `js/firebase-client.js`). Each function in `api/` verifies that token
with `firebase-admin` (`api/_firebase.js`) and reads/writes Firestore
directly — the client never touches Firestore itself.

Endpoints (`api/*.js`):

- `ensure-user-profile` — creates/refreshes `users/{uid}` and
  `publicProfiles/{uid}` after sign-in
- `update-profile` — handle, display name, timezone, daily goal, avatar
  upload, tutorial progress, password/account management
- `start-course` — activates a new language course
- `complete-practice-session`, `preview-sprint-end` — scores a practice or
  sprint session: XP, coins, course level, streaks, streak freezes, missions
- `unlock-word`, `buy-key`, `buy-word-chest`, `buy-streak-freeze` — the
  key/chest/shop economy
- `claim-daily-chest`, `get-home-overview` — dashboard state and the daily
  reward
- `friends` — search, requests, accept/decline, remove, activity feed

`api/` needs a Firebase service account, whether run locally or on Vercel:

```txt
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

plus the Storj variables from [Profile photos](#profile-photos) for avatar
uploads.

To run it locally, use `vercel dev` so `/api/*` is served alongside the
static files, pointed at a real Firebase project (a dedicated dev project is
safest) with `FIREBASE_USE_EMULATORS=false` — the client then signs in
against that same project instead of the Auth emulator, so its ID tokens
verify correctly against your service account.

### Legacy: Firebase Cloud Functions

`functions/index.js` is an earlier callable-functions implementation of
profiles, practice sessions, and friends. It still deploys
(`cd functions && npm run deploy`) and has its own emulator
(`cd functions && npm run serve`, using the `auth`, `functions`, `firestore`,
and `hosting` emulators from `firebase.json`), but the frontend no longer
calls it — everything now goes through `api/`. Kept for reference only.

## Generate word audio

One-off audio generation reads a deck CSV, creates speech with ElevenLabs,
and uploads MP3 files to Storj using its S3-compatible API. Put secrets in
`.env.local` (see `.env.example` for the full list, including a per-language
`ELEVENLABS_<LANGUAGE>_VOICE_ID`).

```bash
npm run generate:audio:all -- --dry-run --limit=5   # preview every deck
npm run generate:audio:chinese -- --dry-run --limit=5
npm run generate:audio:chinese                       # generate + upload
```

The same `generate:audio:<language>` script exists for german, italian,
japanese, norwegian, spanish, and swedish. `generate:audio:all` runs every
active deck from `decks/index.js` in sequence and forwards flags like
`--dry-run`, `--limit=5`, `--force`, or `--continue-on-error`.

Files are saved as `{STORJ_BUCKET}/audio/v1/<deck-id>/<word_id>.mp3`, and the
trainer builds audio URLs as
`{AUDIO_BASE_URL}/audio/v1/<deck-id>/<word_id>.mp3`. `AUDIO_BASE_URL` must be
a public URL mapping to the bucket root, without a trailing slash.

## Profile photos

Signed-in users can set a username and upload a profile photo from
`profile.html`. Photos go through `api/` to Storj using the same
S3-compatible credentials as audio, then the public URL is saved on
`users/{uid}` and `publicProfiles/{uid}` as
`{STORJ_BUCKET}/profiles/v1/<uid>/avatar-<timestamp>.jpg`.

Set `PROFILE_IMAGE_BASE_URL` to the public bucket root for profile images
(falls back to `AUDIO_BASE_URL` if empty). Keep `PROFILE_IMAGE_PREFIX`
separate from `AUDIO_PREFIX` so generated word audio and user uploads don't
mix.

## Vercel production

Vercel hosts the static frontend and the `api/` functions. Set these in
Project Settings > Environment Variables:

```txt
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_APP_ID
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_MEASUREMENT_ID
FIREBASE_USE_EMULATORS=false
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
AUDIO_BASE_URL
AUDIO_PREFIX=audio/v1
PROFILE_IMAGE_BASE_URL
PROFILE_IMAGE_PREFIX=profiles/v1
STORJ_ENDPOINT
STORJ_REGION
STORJ_ACCESS_KEY_ID
STORJ_SECRET_ACCESS_KEY
STORJ_BUCKET
```

The first four Firebase keys and the service account pair
(`FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) are required for the build
and for `api/` to work at all. `AUDIO_BASE_URL` is only required if you want
production flashcards to play hosted audio. Find the client-side Firebase
values in Firebase Console > Project settings > General > Your apps > Web
app config, and the service account pair under Project settings > Service
accounts.

Also enable Firebase Console > Authentication > Sign-in method >
Email/Password, and add your Vercel domain under Authentication > Settings >
Authorized domains.

`npm run build` creates `dist/` and writes `dist/js/firebase-config.js` from
those environment variables. The checked-in `js/firebase-config.js` is only
the local emulator demo config.

## Firestore data model

```txt
users/{uid}
users/{uid}/courses/{courseId}
users/{uid}/dailyStats/{yyyy-mm-dd}
users/{uid}/badges/{badgeId}
users/{uid}/friends/{friendUid}
publicProfiles/{uid}
usernames/{handle}
friendRequests/{pairId}
activities/{activityId}
```

`users/{uid}` is private to the owner. `publicProfiles/{uid}` is readable by
signed-in users and is the safe profile surface for friend search,
leaderboards, and activity feeds.

## Deck and lesson content

Word decks are CSV files. A deck can use any column names as long as
`decks/index.js` maps them to the app fields:

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

To add a new deck: add a CSV file inside `decks/`, add one metadata object to
`window.DECK_INDEX` in `decks/index.js`, and reload the app. The backend
computes `wordsUnlocked` as `courseLevel * 5`.

Two other content sets, loaded and validated the same way in both the
browser and `api/_lib.js`:

- `decks/categories.js` — word groupings for the categories page, generated
  by `scripts/generate-categories.cjs` (do not hand-edit).
- `decks/lessons-<language>.js` — a hand-authored grammar/vocabulary lesson
  curriculum per course, rendered by `js/lessons.js`. Lesson order in each
  array is unlock order; lesson ids must stay stable once shipped, since
  they're stored as completed on player profiles.

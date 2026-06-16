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
  - Norwegian, 20 unlock levels with 5 words per level

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

Use the `Sign in` menu in the header. Press `Create` for a new local emulator
account, then use `Sign in` with the same email and password later.

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
FIREBASE_STORAGE_BUCKET
FIREBASE_MEASUREMENT_ID
FIREBASE_FUNCTIONS_REGION=europe-west1
FIREBASE_USE_EMULATORS=false
```

Only the first four are required by the build script. You can find these values
in Firebase Console > Project settings > General > Your apps > Web app config.

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

Norwegian currently has 100 rows:

```txt
20 levels x 5 words = 100 unlockable words
```

# Polytype Trainer Firebase Backend

This folder contains the server-side layer for user progression, daily streaks,
streak freezes, and social friend requests.

## Setup

1. Install the Firebase CLI if needed.
2. Select your Firebase project:

   ```bash
   firebase use --add
   ```

3. Install dependencies:

   ```bash
   cd functions
   npm install
   ```

4. Run locally with emulators:

   ```bash
   npm run serve
   ```

5. Deploy backend and rules:

   ```bash
   npm run deploy
   ```

## Callable functions

- `ensureUserProfile`: creates or refreshes `users/{uid}` and
  `publicProfiles/{uid}` after sign-in.
- `setUserHandle`: reserves a unique username in `usernames/{handle}`.
- `completePracticeSession`: updates XP, course level, daily stats, streaks,
  and streak freezes inside one Firestore transaction.
- `grantStreakFreeze`: adds one freeze up to the user's cap.
- `sendFriendRequest`: creates a pending request between two users.
- `respondFriendRequest`: accepts or declines a pending request.
- `removeFriend`: removes friendship in both user subcollections.

All writes to progression and social documents should go through these
functions. Firestore rules intentionally block direct client writes.

const { db, auth: adminAuth, FieldValue } = require("./_firebase");
const {
  withAuth, normalizeHandle, normalizeDisplayName, normalizeDailyGoalXp, getAuthProfile,
  buildDefaultUserProfile, buildPublicProfile, sanitizeUserProfile,
  normalizeTimezone, ApiError
} = require("./_lib");
const { getStorjConfig, putStorjObject, getPublicObjectUrl } = require("./_storj");

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const IMAGE_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"]
]);

// Consolidated so this counts as a single Vercel serverless function
// (Hobby plan caps a deployment at 12) - dispatches on data.action instead
// of one file per profile-editing operation.
module.exports = withAuth(async (data, token) => {
  switch (data.action) {
    case "handle": return setHandle(data, token);
    case "name": return setDisplayName(data, token);
    case "avatar": return uploadAvatar(data, token);
    case "advanceTutorial": return advanceTutorial(data, token);
    case "dailyGoal": return setDailyGoal(data, token);
    case "delete": return deleteAccount(data, token);
    default: throw new ApiError(400, "Unknown profile action.");
  }
});

async function setHandle(data, token) {
  const handle = normalizeHandle(data.handle);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);
    const usernameRef = db.doc(`usernames/${handle}`);
    const userSnap = await transaction.get(userRef);
    const usernameSnap = await transaction.get(usernameRef);

    if (usernameSnap.exists && usernameSnap.data().uid !== token.uid) {
      throw new ApiError(409, "This handle is already taken.");
    }

    const previousHandle = userSnap.exists ? userSnap.data().handle : null;
    const previousHandleRef = previousHandle && previousHandle !== handle
      ? db.doc(`usernames/${previousHandle}`)
      : null;

    if (previousHandleRef) transaction.delete(previousHandleRef);

    const now = FieldValue.serverTimestamp();
    transaction.set(usernameRef, { uid: token.uid, handle, updatedAt: now });
    transaction.set(userRef, { handle, updatedAt: now }, { merge: true });
    transaction.set(publicRef, { handle, updatedAt: now }, { merge: true });

    return { handle };
  });
}

async function setDisplayName(data, token) {
  const displayName = normalizeDisplayName(data.name);
  const now = FieldValue.serverTimestamp();

  const userRef = db.doc(`users/${token.uid}`);
  const publicRef = db.doc(`publicProfiles/${token.uid}`);

  await Promise.all([
    userRef.set({ displayName, updatedAt: now }, { merge: true }),
    publicRef.set({ displayName, updatedAt: now }, { merge: true })
  ]);

  return { displayName };
}

async function uploadAvatar(data, token) {
  const image = parseImageDataUrl(data.imageDataUrl);
  const authProfile = getAuthProfile(token);
  const config = getStorjConfig();
  const safeUid = String(token.uid).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 128);
  const objectKey = `${config.profileImagePrefix}/${safeUid}/avatar-${Date.now()}.${image.extension}`;

  await putStorjObject(objectKey, image.buffer, {
    "cache-control": "public, max-age=31536000, immutable",
    "content-type": image.mimeType,
    "x-amz-meta-user-id": safeUid
  }, config);

  const avatarUrl = getPublicObjectUrl(objectKey, config);
  const now = FieldValue.serverTimestamp();

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);
    const userSnap = await transaction.get(userRef);
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const timezone = normalizeTimezone(data.timezone || existingUser?.timezone);
    const baseProfile = buildDefaultUserProfile(token.uid, authProfile, timezone);
    const userProfile = {
      ...baseProfile,
      ...existingUser,
      avatarUrl,
      email: existingUser?.email || authProfile.email,
      timezone,
      updatedAt: now,
      lastActiveAt: now
    };

    if (!userSnap.exists) userProfile.createdAt = now;

    transaction.set(userRef, userProfile, { merge: true });
    transaction.set(publicRef, {
      ...buildPublicProfile(token.uid, userProfile, authProfile),
      avatarUrl,
      updatedAt: now
    }, { merge: true });

    return {
      avatarUrl,
      user: sanitizeUserProfile(userProfile)
    };
  });
}

// Only the deck-intro -> buy-keys transition is a pure "player read the
// explainer, tapped continue" step with no other data change to hang it off
// - every later tutorial step advances itself inside the transaction for
// the action it's gating (see api/buy-key.js, api/unlock-word.js,
// api/complete-practice-session.js), so this is intentionally the only step
// reachable through this action.
async function advanceTutorial(data, token) {
  const userRef = db.doc(`users/${token.uid}`);

  return db.runTransaction(async transaction => {
    const userSnap = await transaction.get(userRef);
    if (!userSnap.exists) throw new ApiError(404, "Profile not found.");

    const tutorial = userSnap.data().tutorial;
    if (!tutorial?.active || tutorial.step !== "deck-intro") {
      throw new ApiError(409, "Tutorial is not on the deck-intro step.");
    }

    const nextTutorial = { ...tutorial, step: "buy-keys" };
    transaction.set(userRef, { tutorial: nextTutorial, updatedAt: FieldValue.serverTimestamp() }, { merge: true });

    return { tutorial: nextTutorial };
  });
}

async function setDailyGoal(data, token) {
  const dailyGoalXp = normalizeDailyGoalXp(data.dailyGoalXp);
  const userRef = db.doc(`users/${token.uid}`);

  await userRef.set({ dailyGoalXp, updatedAt: FieldValue.serverTimestamp() }, { merge: true });

  return { dailyGoalXp };
}

// Deletes everything this account's uid owns or is referenced by, then the
// Firebase Auth user itself - in that order, so a crash partway through
// never leaves an Auth user pointing at already-gone Firestore data. Doesn't
// chase every possible reference (e.g. a still-pending friendRequests doc
// naming this uid) - those just resolve to "user not found" wherever they're
// later read, the same way any other deleted-but-still-referenced uid does.
async function deleteAccount(data, token) {
  const userRef = db.doc(`users/${token.uid}`);
  const userSnap = await userRef.get();
  const handle = userSnap.exists ? userSnap.data().handle : null;

  const friendsSnap = await db.collection(`users/${token.uid}/friends`).get();
  const badgesSnap = await db.collection(`users/${token.uid}/badges`).get();
  const dailyStatsSnap = await db.collection(`users/${token.uid}/dailyStats`).get();

  const batch = db.batch();
  const now = FieldValue.serverTimestamp();
  friendsSnap.docs.forEach(doc => {
    // Remove the mutual-friend edge on both sides (same pair of doc paths
    // api/friends.js's removeFriend uses) without touching the rest of that
    // friend's own user doc - only their friendCount changes.
    batch.delete(doc.ref);
    batch.delete(db.doc(`users/${doc.id}/friends/${token.uid}`));
    batch.set(db.doc(`users/${doc.id}`), { friendCount: FieldValue.increment(-1), updatedAt: now }, { merge: true });
  });
  badgesSnap.docs.forEach(doc => batch.delete(doc.ref));
  dailyStatsSnap.docs.forEach(doc => batch.delete(doc.ref));
  batch.delete(userRef);
  batch.delete(db.doc(`publicProfiles/${token.uid}`));
  if (handle) batch.delete(db.doc(`usernames/${handle}`));

  await batch.commit();
  await adminAuth.deleteUser(token.uid);

  return { deleted: true };
}

function parseImageDataUrl(value) {
  if (typeof value !== "string") {
    throw new ApiError(400, "Image data is required.");
  }

  const match = value.match(/^data:(image\/(?:jpeg|png|webp));base64,([a-zA-Z0-9+/=]+)$/);
  if (!match) {
    throw new ApiError(400, "Profile image must be a JPEG, PNG, or WebP data URL.");
  }

  const mimeType = match[1];
  const extension = IMAGE_TYPES.get(mimeType);
  if (!extension) {
    throw new ApiError(400, "Unsupported profile image type.");
  }

  const buffer = Buffer.from(match[2], "base64");
  if (!buffer.length) {
    throw new ApiError(400, "Profile image is empty.");
  }

  if (buffer.length > MAX_AVATAR_BYTES) {
    throw new ApiError(413, "Profile image is too large.");
  }

  return { buffer, extension, mimeType };
}

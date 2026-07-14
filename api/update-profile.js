const { db, FieldValue } = require("./_firebase");
const {
  withAuth, normalizeHandle, normalizeDisplayName, getAuthProfile,
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

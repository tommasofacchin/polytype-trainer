const { db, FieldValue } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  getLevelInfo, getDateKeyForTimezone, normalizeTimezone, evaluateNewBadges,
  CHEST_COIN_REWARD, CHEST_XP_REWARD, ApiError
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);

    const userSnap = await transaction.get(userRef);
    const badgesSnap = await transaction.get(userRef.collection("badges"));
    const earnedBadgeIds = badgesSnap.docs.map(doc => doc.id);

    const authProfile = getAuthProfile(token);
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const timezone = normalizeTimezone(data.timezone || existingUser?.timezone);
    const todayKey = getDateKeyForTimezone(new Date(), timezone);

    if (existingUser?.lastChestClaimedDate === todayKey) {
      throw new ApiError(409, "The daily chest has already been claimed today.");
    }

    const totalXp = (existingUser?.totalXp || 0) + CHEST_XP_REWARD;
    const globalLevel = getLevelInfo(totalXp).level;
    const coins = (existingUser?.coins || 0) + CHEST_COIN_REWARD;
    const chestsClaimed = (existingUser?.chestsClaimed || 0) + 1;

    const now = FieldValue.serverTimestamp();
    const userData = {
      ...buildDefaultUserProfile(token.uid, authProfile, timezone),
      ...existingUser,
      displayName: existingUser?.displayName || authProfile.displayName,
      avatarUrl: existingUser?.avatarUrl || authProfile.avatarUrl,
      email: existingUser?.email || authProfile.email,
      timezone,
      totalXp,
      globalLevel,
      coins,
      chestsClaimed,
      lastChestClaimedDate: todayKey,
      updatedAt: now,
      lastActiveAt: now
    };

    if (!userSnap.exists) userData.createdAt = now;

    const newBadges = evaluateNewBadges(userData, { chestsClaimed }, earnedBadgeIds);

    transaction.set(userRef, userData, { merge: true });
    transaction.set(publicRef, { ...buildPublicProfile(token.uid, userData, authProfile), updatedAt: now }, { merge: true });
    newBadges.forEach(badge => {
      transaction.set(userRef.collection("badges").doc(badge.id), {
        badgeId: badge.id,
        earnedAt: now
      });
    });

    return {
      coins,
      totalXp,
      globalLevel,
      coinsEarned: CHEST_COIN_REWARD,
      xpEarned: CHEST_XP_REWARD,
      newBadges: newBadges.map(badge => ({ id: badge.id }))
    };
  });
});

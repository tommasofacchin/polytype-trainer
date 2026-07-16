const { db, FieldValue } = require("./_firebase");
const {
  withAuth, getAuthProfile, buildDefaultUserProfile, buildPublicProfile,
  sanitizeUserProfile, normalizeTimezone
} = require("./_lib");

module.exports = withAuth(async (data, token) => {
  const authProfile = getAuthProfile(token);
  const timezone = normalizeTimezone(data.timezone);
  const badgesSnap = await db.collection(`users/${token.uid}/badges`).get();
  const badges = badgesSnap.docs.map(doc => doc.id);

  return db.runTransaction(async transaction => {
    const userRef = db.doc(`users/${token.uid}`);
    const publicRef = db.doc(`publicProfiles/${token.uid}`);
    const userSnap = await transaction.get(userRef);
    const baseProfile = buildDefaultUserProfile(token.uid, authProfile, timezone);
    const now = FieldValue.serverTimestamp();

    const rawExisting = userSnap.exists ? userSnap.data() : null;
    const userProfile = rawExisting
      ? { ...baseProfile, ...rawExisting, email: rawExisting.email || authProfile.email, timezone }
      : baseProfile;

    // One-time migration: coins used to be a single balance shared across
    // every language: now each course has its own (see start-course.js/
    // buy-key.js). Copy the legacy balance onto every course already in
    // progress, rather than splitting it, so nobody feels like they lost
    // coins. A brand-new account never has this field, so this only ever
    // runs once per pre-existing player.
    const legacyCoins = typeof rawExisting?.coins === "number" ? Math.max(0, Math.trunc(rawExisting.coins)) : null;
    if (legacyCoins !== null) {
      userProfile.courses = Object.fromEntries(
        Object.entries(userProfile.courses || {}).map(([courseId, course]) => [
          courseId,
          { ...course, coins: (course.coins || 0) + legacyCoins }
        ])
      );
    }
    delete userProfile.coins;

    // One-time repair for accounts caught by an earlier, incomplete version
    // of the migration above: it boosted only the embedded courses map on
    // this document, never the users/{uid}/courses/{courseId} subcollection
    // doc that buy-key.js and friends actually check first (see the comment
    // by that Object.entries().forEach below) - and by the time that fix
    // shipped, legacyCoins was already gone for those accounts (deleted by
    // their first, broken migration run), so the block below never re-runs
    // for them. This instead compares each course's two copies directly,
    // independent of legacyCoins, and heals the subcollection whenever it's
    // behind - gated on coinsRepairDone so it's still only ever a single
    // extra read per course, once per account.
    let coinsRepair = null;
    if (userSnap.exists && !rawExisting?.coinsRepairDone) {
      const courseEntries = Object.entries(userProfile.courses || {});
      const courseSnaps = await Promise.all(
        courseEntries.map(([courseId]) => transaction.get(userRef.collection("courses").doc(courseId)))
      );
      coinsRepair = courseEntries.map(([courseId, course], index) => {
        const subSnap = courseSnaps[index];
        const subCoins = subSnap.exists ? Number(subSnap.data().coins) || 0 : 0;
        const embeddedCoins = Number(course.coins) || 0;
        return { courseId, coins: Math.max(embeddedCoins, subCoins) };
      });
    }

    if (!userSnap.exists) {
      transaction.set(userRef, { ...userProfile, createdAt: now, updatedAt: now, lastActiveAt: now });
    } else {
      const updatePayload = { email: userProfile.email, timezone, updatedAt: now, lastActiveAt: now };
      if (legacyCoins !== null) {
        updatePayload.coins = FieldValue.delete();
        updatePayload.courses = userProfile.courses;
        // The embedded map above isn't the only copy of a course's coins -
        // every coin-spending endpoint (api/buy-key.js, buy-word-chest.js,
        // unlock-word.js, complete-practice-session.js, claim-daily-
        // chest.js) reads the SEPARATE users/{uid}/courses/{courseId}
        // subcollection document preferentially, falling back to this
        // embedded map only if that document doesn't exist yet. Without
        // this, a returning player's subcollection docs stay stuck at
        // their pre-migration (often zero) balance forever - the header
        // and shop UI (which read the embedded map) would show the
        // correct migrated total while every purchase still failed with
        // "not enough coins".
        Object.entries(userProfile.courses).forEach(([courseId, course]) => {
          transaction.set(userRef.collection("courses").doc(courseId), { coins: course.coins }, { merge: true });
        });
      }
      if (coinsRepair) {
        updatePayload.coinsRepairDone = true;
        coinsRepair.forEach(({ courseId, coins }) => {
          transaction.set(userRef.collection("courses").doc(courseId), { coins }, { merge: true });
          if (userProfile.courses?.[courseId]) userProfile.courses[courseId].coins = coins;
        });
      }
      transaction.set(userRef, updatePayload, { merge: true });
    }

    const publicProfile = buildPublicProfile(
      token.uid,
      userProfile,
      authProfile
    );
    transaction.set(publicRef, { ...publicProfile, updatedAt: now }, { merge: true });

    return {
      user: { ...sanitizeUserProfile(userProfile), badges },
      publicProfile
    };
  });
});

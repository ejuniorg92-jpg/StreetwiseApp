const { onCall } = require("firebase-functions/v2/https");

exports.upgradeTier = onCall((request) => {
  const tier = request.data?.tier || "Streetwise";
  return { success: true, newTier: tier, message: `Upgraded to ${tier}` };
});

const { onCall } = require("firebase-functions/v2/https");

exports.aiRespondSecure = onCall((request) => {
  const message = request.data?.message || "No input";
  return { success: true, reply: `AI says: ${message}` };
});

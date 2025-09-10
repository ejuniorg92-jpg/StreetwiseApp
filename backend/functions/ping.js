const { onRequest } = require("firebase-functions/v2/https");

exports.ping = onRequest((req, res) => {
  res.json({ success: true, message: "pong" });
});

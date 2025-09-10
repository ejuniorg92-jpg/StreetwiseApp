// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const { onRequest } = require("firebase-functions/v2/https");

exports.ping = onRequest((req, res) => {
  res.json({ success: true, message: "pong" });
});


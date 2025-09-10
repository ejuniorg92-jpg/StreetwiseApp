// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const { onRequest } = require("firebase-functions/v2/https");

exports.getZones = onRequest((req, res) => {
  res.json({
    success: true,
    zones: [
      { name: "Downtown", risk: "medium" },
      { name: "Northside", risk: "high" },
      { name: "West End", risk: "low" }
    ]
  });
});


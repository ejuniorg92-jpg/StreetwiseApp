const { onRequest } = require("firebase-functions/v2/https");

exports.getDailyMission = onRequest((req, res) => {
  res.json({
    success: true,
    mission: "Mindset mission: 10 minutes of reflection or journaling."
  });
});

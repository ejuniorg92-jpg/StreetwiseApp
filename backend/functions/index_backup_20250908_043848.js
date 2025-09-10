const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// === Import feature modules ===
const ping = require("./ping");
const getDailyMission = require("./getDailyMission");
const aiRespondSecure = require("./aiRespondSecure");
const getCryptoPrices = require("./getCryptoPrices");
const crypto = require("./crypto");
const panicButton = require("./panicButton");
const getZones = require("./getZones");
const startInterview = require("./startInterview");
const upgradeTier = require("./upgradeTier");
const lawLibrary = require("./lawLibrary");

// === Export functions ===
exports.ping = functions.https.onRequest(ping);
exports.getDailyMission = functions.https.onRequest(getDailyMission);
exports.aiRespondSecure = functions.https.onCall(aiRespondSecure);
exports.getCryptoPrices = functions.https.onRequest(getCryptoPrices);
exports.crypto = functions.https.onRequest(crypto);
exports.panicButton = functions.https.onRequest(panicButton);
exports.getZones = functions.https.onRequest(getZones);
exports.startInterview = functions.https.onRequest(startInterview);
exports.upgradeTier = functions.https.onRequest(upgradeTier);
exports.lawLibrary = functions.https.onRequest(lawLibrary);

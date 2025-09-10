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

// === Export functions with region ===
exports.ping = functions.region("northamerica-northeast1").https.onRequest(ping);
exports.getDailyMission = functions.region("northamerica-northeast1").https.onRequest(getDailyMission);
exports.aiRespondSecure = functions.region("northamerica-northeast1").https.onCall(aiRespondSecure);
exports.getCryptoPrices = functions.region("northamerica-northeast1").https.onRequest(getCryptoPrices);
exports.crypto = functions.region("northamerica-northeast1").https.onRequest(crypto);
exports.panicButton = functions.region("northamerica-northeast1").https.onRequest(panicButton);
exports.getZones = functions.region("northamerica-northeast1").https.onRequest(getZones);
exports.startInterview = functions.region("northamerica-northeast1").https.onRequest(startInterview);
exports.upgradeTier = functions.region("northamerica-northeast1").https.onRequest(upgradeTier);
exports.lawLibrary = functions.region("northamerica-northeast1").https.onRequest(lawLibrary);

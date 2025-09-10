// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const cors = require("cors")({ origin: true });

initializeApp();

// Import feature modules
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

// Export functions with region
exports.ping = onRequest({ region: "northamerica-northeast1" }, ping);
exports.getDailyMission = onRequest({ region: "northamerica-northeast1" }, getDailyMission);
exports.aiRespondSecure = onCall({ region: "northamerica-northeast1" }, aiRespondSecure);
exports.getCryptoPrices = onRequest({ region: "northamerica-northeast1" }, getCryptoPrices);
exports.crypto = onRequest({ region: "northamerica-northeast1" }, crypto);
exports.panicButton = onRequest({ region: "northamerica-northeast1" }, panicButton);
exports.getZones = onRequest({ region: "northamerica-northeast1" }, getZones);
exports.startInterview = onRequest({ region: "northamerica-northeast1" }, startInterview);
exports.upgradeTier = onRequest({ region: "northamerica-northeast1" }, upgradeTier);
exports.lawLibrary = onRequest({ region: "northamerica-northeast1" }, lawLibrary);

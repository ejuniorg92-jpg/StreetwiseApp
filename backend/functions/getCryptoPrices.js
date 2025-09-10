const { onRequest } = require("firebase-functions/v2/https");

exports.getCryptoPrices = onRequest((req, res) => {
  res.json({
    success: true,
    prices: { BTC: 20873.67, ETH: 3672.26 } // stub, replace with live fetch later
  });
});

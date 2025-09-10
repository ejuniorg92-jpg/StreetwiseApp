export const Api = {
  async getCryptoPrices() {
    const res = await fetch(
      'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/getCryptoPrices'
    );
    return res.json();
  },
  async getZones() {
    const res = await fetch(
      'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/getZones'
    );
    return res.json();
  },
  async upgradeTier() {
    const res = await fetch(
      'http://127.0.0.1:5011/streetwise-b13be/northamerica-northeast1/upgradeTier'
    );
    return res.json();
  },
};




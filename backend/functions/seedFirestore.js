// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Always connect to emulator
initializeApp({ projectId: "streetwise-b13be" });
const db = getFirestore();
db.settings({ host: "127.0.0.1:8081", ssl: false });

async function seed() {
  console.log(" Seeding Firestore data into emulator...");

  const zones = [
    { name: "Downtown Core", coords: { lat: 43.6532, lng: -79.3832 } },
    { name: "Hustler Market", coords: { lat: 43.6577, lng: -79.3788 } }
  ];
  for (const z of zones) await db.collection("zones").add(z);

  const incidents = [
    { description: "Police stop reported", coords: { lat: 43.6510, lng: -79.3840 } },
    { description: "Shady deal spotted", coords: { lat: 43.6550, lng: -79.3900 } }
  ];
  for (const i of incidents) await db.collection("incidents").add(i);

  const missions = [
    { title: "Sell 3 items today", coords: { lat: 43.6540, lng: -79.3860 } },
    { title: "Scout new hustle zone", coords: { lat: 43.6520, lng: -79.3800 } }
  ];
  for (const m of missions) await db.collection("missions").add(m);

  console.log(" Firestore emulator seeded successfully.");
  process.exit(0);
}

seed().catch(err => {
  console.error(" Error seeding Firestore:", err);
  process.exit(1);
});


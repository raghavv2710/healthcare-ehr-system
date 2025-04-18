// backend/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
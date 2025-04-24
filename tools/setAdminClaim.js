const admin = require("firebase-admin");
const serviceAccount = require("../backend/firebaseServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const emailToMakeAdmin = "admin@example.com";

admin
  .auth()
  .getUserByEmail(emailToMakeAdmin)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { role: "admin" });
  })
  .then(() => {
    console.log(`✅ ${emailToMakeAdmin} has been given admin role.`);
    process.exit();
  })
  .catch((error) => {
    console.error("Error setting custom claims:", error);
    process.exit(1);
  });

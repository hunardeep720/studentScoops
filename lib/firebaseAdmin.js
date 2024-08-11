// lib/firebaseAdmin.js
import admin from 'firebase-admin';

const serviceAccount = require('../config/studentscoops-20914-firebase-adminsdk-i85jn-ff7c269140.json'); // Adjust path if needed

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

export { auth };
import * as admin from 'firebase-admin';

function getFirebaseAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  // If env variables are missing (e.g. during Vercel build), we can return null
  // or a dummy app to prevent the build from crashing.
  if (!process.env.FIREBASE_PROJECT_ID) {
    console.warn('Firebase Admin env variables are missing. Initialization skipped.');
    return null;
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
    return null;
  }
}

const app = getFirebaseAdminApp();

export const adminDb = app ? admin.firestore() : null;
export const adminAuth = app ? admin.auth() : null;

import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";
// Your service account details
const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

// Check if any apps have been initialized. If not, initialize a new app
export const app = admin.apps.length
  ? admin.app() // Use the existing app instance
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });

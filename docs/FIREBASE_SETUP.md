## Firebase Configuration

To integrate your Firebase project with this starter pack, you will need to set up your Firebase configuration. Follow these steps:

### Client-side Firebase API keys:

1. Obtain your web app's Firebase configuration keys from the [Firebase Console](https://console.firebase.google.com/).
   - Navigate to `Project settings` > `General` > `Your apps`.
   - If you haven't added a web app to your project yet, click the web icon (`</>`) and follow the prompts.

### Incorporate Client-side Firebase API keys into your project:

1. Within your project, navigate to `src/firebase/`.
2. Create or edit `client.ts` and insert your Firebase configuration:

```typescript
// src/firebase/client.ts

import { initializeApp } from "firebase/app";

// Replace below with your app's Firebase configuration from the Firebase console
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_project_id.firebaseapp.com",
  projectId: "your_project_id",
  storageBucket: "your_project_id.appspot.com",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
  measurementId: "your_measurement_id",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
```

### Server-side Firebase Configuration

From the [Firebase Console](https://console.firebase.google.com/), navigate to `Project settings` > `Service accounts` and generate a new private key.

## Set up Environment Variables

### Automated Setup with Helper Script

For a quick setup, use our `createEnvFromServiceAccount.js` script to convert your service account JSON into a `.env` file:

1. Place your service account JSON file in the project root and rename it to `service-account.json`.
2. Run the script in your terminal:

   ```bash
   node scripts/createEnvFromServiceAccount.js
   ```

### Manual Setup Option

If you prefer to manually configure the environment variables:

1. Open `service-account.json` and manually extract the necessary fields.
2. Create a new `.env` file in your project root.
3. Use the structure below for your `.env` file, replacing each placeholder with the corresponding value from your JSON file:

   ```env
   FIREBASE_PRIVATE_KEY_ID=<private_key_id>
   FIREBASE_PRIVATE_KEY="<private_key>"
   FIREBASE_PROJECT_ID=<project_id>
   FIREBASE_CLIENT_EMAIL=<client_email>
   FIREBASE_CLIENT_ID=<client_id>
   FIREBASE_AUTH_URI=<auth_uri>
   FIREBASE_TOKEN_URI=<token_uri>
   FIREBASE_AUTH_PROVIDER_CERT_URL=<auth_provider_x509_cert_url>
   FIREBASE_CLIENT_CERT_URL=<client_x509_cert_url>
   ```

🎉 All set! You're ready to build with Firebase integrated into your project.

## Integrating Firebase Features

Now that you have set up your Firebase environment, you can start integrating various Firebase services such as Firestore and authentication methods like Google Sign-In and Email/Password authentication.

### Enabling Firestore Database

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project and navigate to `Firestore Database` in the left menu.
3. Click `Create database` and follow the prompts to set up Firestore. For a safer environment that enforces your security rules, I recommend starting in `production mode`.

### Adding Authentication Methods

#### Google Sign-In

1. In the Firebase Console, navigate to `Authentication`.
2. If you haven’t already set up authentication, click `Get started`.
3. Then, go to the `Sign-in method` tab.
4. Click on `Google` and toggle the enable switch to activate Google as a sign-in provider.
5. Configure your OAuth consent screen and save the Web client ID as prompted.

> **Important**: Adding your domain to the on `Authentication` > `Authorized Domains` for Google Sign-In is essential once your application is deployed on not on localhost. This step is crucial for Google Sign-In to work on your deployed site.

#### Email/Password Authentication

1. Still in the `Authentication` section, locate `Email/Password` and toggle it on.
2. Note that `Email link (passwordless sign-in)` is not supported by the template.

### Resources and Support

- Refer to the [official Firebase documentation](https://firebase.google.com/docs) for in-depth guides and API references.

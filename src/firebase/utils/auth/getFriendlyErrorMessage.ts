/**
 * Translates Firebase error codes into user-friendly messages.
 * @param {FirebaseError} error - The error object from Firebase with `code` and `message` properties.
 * @returns {string} - A user-friendly error message.
 */

import type { FirebaseError } from "firebase/app";

type FirebaseErrorMapping = {
  [key: string]: string;
};

const firebaseErrorMapping: FirebaseErrorMapping = {
  "auth/invalid-login-credentials":
    "Invalid login credentials. Please check your email and password and try again.",
  "auth/user-not-found":
    "No account found with this email. Please sign up if you're new.",
  "auth/wrong-password":
    "Incorrect password. Please try again or reset your password.",
  "auth/weak-password":
    "Password should be at least 6 characters long. Please choose a stronger password.",
  "auth/email-already-in-use":
    "This email address is already in use by another account. Please use a different email address or sign in to your existing account.",
};

function getFriendlyErrorMessage(error: FirebaseError): string {
  return firebaseErrorMapping[error.code] || error.message;
}

export default getFriendlyErrorMessage;

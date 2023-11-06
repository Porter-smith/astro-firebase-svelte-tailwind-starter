/**
 * Retrieves user data based on the provided session cookie.
 * @param {string} cookie - The session cookie string to verify and extract user data from.
 * @returns {Promise<any | null>} - A promise that resolves with the user data if authenticated, otherwise null.
 */

import { getAuth } from "firebase-admin/auth";
import { app } from "@/firebase/server";

async function getUserData(cookie: string | null) {
  // If there's no cookie, return null immediately.
  if (cookie === null) {
    return null;
  }

  const auth = getAuth(app);

  try {
    const decodedCookie = await auth.verifySessionCookie(cookie);
    const userRecord = await auth.getUser(decodedCookie.uid); // get user data

    // if user exists and is authenticated, return user data
    return userRecord;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    // You can handle/log the error as required.
    return null; // Return null in case of any error.
  }
}
export default getUserData;

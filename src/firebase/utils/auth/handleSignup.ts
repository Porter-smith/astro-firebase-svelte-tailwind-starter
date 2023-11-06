/**
 * Handles the user signup process using Firebase authentication. It registers the
 * user with an email and password, updates the user profile with a display name,
 * and sets up a session with the server using the ID token received from Firebase.
 *
 * @param {string} name - The display name of the user.
 * @param {string} email - The email address of the user to register.
 * @param {string} password - The password for the user account.
 * @throws {Error} If registration, profile update, or server session creation fails.
 */
import {
  createUserWithEmailAndPassword,
  getAuth,
  inMemoryPersistence,
  updateProfile,
} from "firebase/auth";
import { app } from "@/firebase/client";
import fetchSignIn from "../../../services/api/fetchSignIn";

const auth = getAuth(app);
auth.setPersistence(inMemoryPersistence);

async function handleSignup(name: string, email: string, password: string) {
  // Register the user using Firebase's client SDK
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  // Update the user's profile with the provided name
  await updateProfile(userCredential.user, {
    displayName: name,
  });

  // Get the ID token of the newly registered user
  const idToken = await userCredential.user.getIdToken();

  const redirectedUrl = await fetchSignIn(idToken);

  return redirectedUrl;
}

export default handleSignup;

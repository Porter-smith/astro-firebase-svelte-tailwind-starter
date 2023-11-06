/**
 * Initiates a Google sign-in process using Firebase Authentication.
 * It authenticates the user, retrieves an ID token, and then attempts to
 * establish a session with the server using the ID token. If the server responds
 * with a redirection, the browser will navigate to the provided URL.
 *
 * @throws Will throw an error if the Google sign-in process or the server session setup fails.
 */
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase/client";

async function handleGoogleSignIn() {
  const auth = getAuth(app);
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    const idToken = await userCredential.user.getIdToken();
    const res = await fetch("/api/auth/signin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (res.redirected) {
      window.location.assign(res.url);
    }
  } catch (error) {
    console.error("Error during Google Sign In or setting user role:", error);
  }
}
export default handleGoogleSignIn;

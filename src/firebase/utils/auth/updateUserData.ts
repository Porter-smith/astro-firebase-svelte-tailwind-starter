import { getAuth } from "firebase-admin/auth";
import type { UserRecord } from "firebase-admin/auth";

/**
 * Updates the data for a specified user.
 *
 * @param {string} uid - The user ID of the Firebase user.
 * @param {UserUpdates} updates - An object containing the data to update.
 * @returns {Promise<UserRecord>} - A promise that resolves with the updated user record.
 */

type UserUpdates = {
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  // If you want to be able to update more stuff you can add type for that here
};

async function updateUserData(
  uid: string,
  updates: UserUpdates
): Promise<UserRecord> {
  const auth = getAuth();

  if (updates?.email) {
    // * When Admin firebase SDK when you change email you need to set emailVerified to true
    updates.emailVerified = false;
  }

  // Perform the update with the modified updates object.
  return await auth.updateUser(uid, updates);
}

export default updateUserData;

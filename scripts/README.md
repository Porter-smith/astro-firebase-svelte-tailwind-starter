# Service Account to `.env` Converter

This directory contains a utility script named `createEnvFromServiceAccount.js`. The purpose of this script is to automate the conversion of Firebase service account credentials from a JSON file to a `.env` file format.

## Why Is This Needed?

This is particularly useful for setting up your project's environment variables without manually copying and pasting each key-value pair.

## Usage Instructions

To convert your service account credentials to a `.env` file:

1. Obtain your `service-account.json` file from the Firebase Console by navigating to `Project settings > Service accounts > Generate new private key`.
2. Save this file in the root directory of your project.
3. Execute the script with Node.js by running:

   ```bash
   node scripts/createEnvFromServiceAccount.js`

   ```

4. Upon successful execution, a `.env` file will be created in the root of your project directory with all the required Firebase environment variables set up.

## Prerequisites

- You must have Node.js installed on your machine to run this script.
- The `service-account.json` file must be present and contain your Firebase service account credentials.


## Important Notes

- The generated `.env` and `service-account.json` file should **never be committed** to version control if your repository and the server is public. Always add `.env` and `service-account.json` to your `.gitignore` file to prevent sensitive credentials from being exposed.
- Ensure that any deployment workflows or hosting environments are configured to secure your `.env` file or its contents appropriately.

Thank you for using this utility to streamline your Firebase project configuration.

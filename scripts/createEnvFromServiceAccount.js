import fs from 'fs/promises';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function askQuestion(question) {
  return new Promise((resolve) => {
    // Added a newline character before the question to have it on a new line
    rl.question(`\n${question} (Y/n) `, (input) => {
      resolve(input.toLowerCase() === 'n' ? 'n' : 'y');
    });
  });
}

async function confirmAction(question, defaultYes = true) {
  const response = await askQuestion(question);
  return defaultYes ? response !== 'n' : response === 'y';
}

async function readAndParseJsonFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

function constructEnvContent(serviceAccount) {
  const escapedPrivateKey = serviceAccount.private_key.replace(/\n/g, '\\n');
  return `FIREBASE_PRIVATE_KEY_ID=${serviceAccount.private_key_id}
FIREBASE_PRIVATE_KEY="${escapedPrivateKey}"
FIREBASE_PROJECT_ID=${serviceAccount.project_id}
FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}
FIREBASE_CLIENT_ID=${serviceAccount.client_id}
FIREBASE_AUTH_URI=${serviceAccount.auth_uri}
FIREBASE_TOKEN_URI=${serviceAccount.token_uri}
FIREBASE_AUTH_PROVIDER_CERT_URL=${serviceAccount.auth_provider_x509_cert_url}
FIREBASE_CLIENT_CERT_URL=${serviceAccount.client_x509_cert_url}`;
}

async function deleteFile(filePath) {
  await fs.unlink(filePath);
}

async function convertServiceAccountToJson() {
  if (!await checkFileExists('service-account.json')) {
    console.error('The `service-account.json` file does not exist. Please make sure it is in the root directory of your project.');
    rl.close();
    return;
  }

  if (!await confirmAction('Start the conversion of service-account.json to .env?\nContinue?')) {
    console.log('Conversion process aborted.');
    rl.close();
    return;
  }

  try {
    const serviceAccount = await readAndParseJsonFile('service-account.json');
    const envContent = constructEnvContent(serviceAccount);
    await fs.writeFile('.env', envContent);
    console.log('.env file created successfully!');

    if (await confirmAction('The .env file has been successfully created from `service-account.json`.\nWould you like to remove the service-account.json file now?\nContinue?')) {
      await deleteFile('service-account.json');
      console.log('The service-account.json file has been deleted successfully.');
    } else {
      console.log('The service-account.json file has not been deleted. For security purposes, please delete it manually after ensuring the .env file contains the correct information.');

    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    rl.close();
  }
}

convertServiceAccountToJson();

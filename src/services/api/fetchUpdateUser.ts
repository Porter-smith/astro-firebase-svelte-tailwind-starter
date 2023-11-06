async function fetchUpdateUser(userData: object) {
  const response = await fetch("/api/user/update", {
    // Assuming this is your endpoint for updating user data
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData), // Make sure to send the user data as JSON
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "Failed to update user. Server responded with status: ${response.status}"
    );
  }

  return data.data; // Return the JSON data
}

export default fetchUpdateUser;

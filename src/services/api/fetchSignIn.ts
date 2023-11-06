async function fetchSignIn(idToken: string) {
  const response = await fetch("/api/auth/signin", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to sign in. Server responded with status: ${response.status}`
    );
  }

  return response.redirected ? response.url : null; // Include URL if redirected
}

export default fetchSignIn;

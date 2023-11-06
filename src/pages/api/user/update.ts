import type { APIRoute } from "astro";
import updateUserData from "@/firebase/utils/auth/updateUserData";
import getUserData from "@/firebase/utils/auth/getUserData";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get("session")?.value ?? null;
    // Get user data based on the session cookie.
    const user = await getUserData(sessionCookie);

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // User is authenticated, proceed with updating user data...
    // Extract the data you want to update from the request body.
    const updates = await request.json();
    if (!updates) {
      return new Response(
        JSON.stringify({ error: "Error: No Updates Passed" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const updatedUserRecord = await updateUserData(user.uid, updates);
    // Return success response
    return new Response(
      JSON.stringify({ success: true, data: updatedUserRecord }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Log the error for server-side debugging.
    console.error(error);
    let errorMessage = "Internal Server Error";
    let statusCode = 500;

    // Check if error is an instance of Error
    if (error instanceof Error) {
      errorMessage = error.message;
      // If the error object has a 'statusCode' property, use it.
      statusCode = (error as { statusCode?: number }).statusCode || 500;
    }

    // Return a generic error response or customize based on the error type
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
};

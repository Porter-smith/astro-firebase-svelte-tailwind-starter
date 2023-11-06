<script>
  import handleSignup from "@/firebase/utils/auth/handleSignup";
  import { Button } from "@/components/base/button";
  import GoogleSignInButton from "./social/GoogleSignInButton.svelte";
  import { Input } from "@/components/base/input";
  import getFriendlyErrorMessage from "@/firebase/utils/auth/getFriendlyErrorMessage";
  let name, email, password, errorMessage;
  async function createAccount() {
    try {
      const redirectedUrl = await handleSignup(name, email, password);
      if (redirectedUrl) {
        window.location.assign(redirectedUrl);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      errorMessage = getFriendlyErrorMessage(error);
    }
  }
</script>

<div
  class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-8 p-6 rounded-xl shadow-lg bg-white">
    <div>
      <h1 class="mt-6 text-center text-3xl font-extrabold text-black">
        Sign up
      </h1>
      <p class="mt-2 text-center text-sm text-black/80">
        Already have an account?
        <a href="/signin" class="font-medium text-black hover:text-black/70">
          Sign in
        </a>
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit|preventDefault={createAccount}>
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="name" class="sr-only">Name</label>
          <Input
            bind:value={name}
            type="text"
            id="name"
            placeholder="Name"
            autocomplete="name"
          />
        </div>
        <div>
          <label for="email" class="sr-only">Email</label>
          <Input
            bind:value={email}
            type="email"
            id="email"
            placeholder="Email"
            autocomplete="email"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <Input
            bind:value={password}
            type="password"
            id="password"
            placeholder="Password"
            autocomplete="password"
          />
        </div>
      </div>
      {#if errorMessage}
        <!-- Container for error message with margin for spacing -->
        <div class="mt-4 mb-3 text-center">
          <p class="text-red-500 text-sm">{errorMessage}</p>
        </div>
      {/if}
      <div>
        <Button class="w-full" type="submit">Sign up</Button>
      </div>
    </form>
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-white px-2 text-[#71717a]">Or continue with</span>
      </div>
    </div>
    <div>
      <GoogleSignInButton />
    </div>
  </div>
</div>

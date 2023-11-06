<script>
  import { onMount } from "svelte";
  import GoogleIcon from "@/components/icons/GoogleIcon.svelte";
  import handleGoogleSignIn from "@/firebase/utils/auth/handleGoogleSignIn";
  import Spinner from "../icons/Spinner.svelte";
  import { Button } from "../base/button";

  let loading = false;

  async function signIn() {
    loading = true;
    await handleGoogleSignIn();
    loading = false;
  }
</script>

<Button variant="google" on:click={signIn} disabled={loading}>
  {#if loading}
    <Spinner />
    Please wait
  {:else}
    <GoogleIcon />
    Sign in with Google
  {/if}
</Button>

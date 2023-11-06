<script>
  import { Button } from "@/components/base/button";
  import { Input } from "@/components/base/input";
  import getFriendlyErrorMessage from "@/firebase/utils/auth/getFriendlyErrorMessage";
  import fetchUpdateUser from "@/services/api/fetchUpdateUser";
  import LoadingButton from "@/components/LoadingButton.svelte";

  export let user;
  let loading = false;
  let name = user?.displayName || "";
  let email = user?.email || "";
  let errorMessage = "";
  let successMessage = "";
  $: hasChanged = name !== user?.displayName || email !== user?.email;

  // Function to construct an object with the new account details
  function getAccountUpdates() {
    let updates = {};
    if (name !== user?.displayName) {
      updates.displayName = name;
    }
    if (email !== user?.email) {
      updates.email = email;
    }
    return updates;
  }

  async function updateAccountDetails(event) {
    event.preventDefault();
    loading = true;
    successMessage = "";
    errorMessage = "";
    const updates = getAccountUpdates();

    try {
      const updatedUser = await fetchUpdateUser(updates);
      console.log(updatedUser);
      successMessage = "Successfully updated..";
      user = { ...user, ...updatedUser };
    } catch (error) {
      console.error("Error updating account:", error);
      errorMessage = getFriendlyErrorMessage(error);
    }
    loading = false;
  }
</script>

<div
  class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-8 p-6 rounded-xl shadow-lg bg-white">
    <div>
      <h1 class="mt-6 text-center text-3xl font-extrabold text-black">
        Edit Account
      </h1>
    </div>
    <form
      class="mt-8 space-y-6"
      on:submit|preventDefault={updateAccountDetails}
    >
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="name" class="sr-only">Name</label>
          <Input
            bind:value={name}
            type="text"
            id="name"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label for="email" class="sr-only">Email</label>
          <Input
            bind:value={email}
            type="email"
            id="email"
            placeholder="Email Address"
            required
          />
        </div>
      </div>
      {#if successMessage}
        <div class="mt-4 mb-3 text-center">
          <p class="text-green-500 text-sm">{successMessage}</p>
        </div>
      {/if}
      {#if errorMessage}
        <div class="mt-4 mb-3 text-center">
          <p class="text-red-500 text-sm">{errorMessage}</p>
        </div>
      {/if}
      <div>
        {#if loading}
          <LoadingButton class="w-full" type="submit" />
        {:else}
          <Button disabled={!hasChanged} class="w-full" type="submit"
            >Save Changes</Button
          >
        {/if}
      </div>
    </form>
  </div>
</div>

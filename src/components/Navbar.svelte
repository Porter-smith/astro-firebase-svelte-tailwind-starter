<script lang="ts">
  import { onMount } from "svelte";
  import UserDropdown from "@/components/UserDropdown.svelte";
  import { Button } from "@/components/base/button";
  import type { User } from "firebase/auth";
  export let user: User;
  let scrolled = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.pageYOffset > 0;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div
  class={`fixed top-0 w-full flex justify-center z-30 transition-all ${
    scrolled
      ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
      : "bg-white/0"
  }`}
>
  <div
    class="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full"
  >
    <a href="/" class="flex items-center font-display text-2xl">
      <img
        src="/astro.svg"
        alt="Astro logo"
        width="30"
        height="30"
        class="mr-2 rounded-sm"
      />
      <p class="ml-5 font-bold">Astro</p>
    </a>
    <div>
      {#if user}
        <UserDropdown {user} />
      {:else}
        <Button href="/signin" variant="rounded">Sign In</Button>
      {/if}
    </div>
  </div>
</div>

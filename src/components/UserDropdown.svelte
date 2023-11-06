<script lang="ts">
  import { Popover } from "@/components/base/popover";
  import DashboardIcon from "./icons/DashboardIcon.svelte";
  import LogoutIcon from "./icons/LogoutIcon.svelte";
  import { Button } from "@/components/base/button";
  import type { User } from "firebase/auth";
  export let user: User;
</script>

{#if user?.email}
  <Popover>
    <button
      slot="trigger"
      let:bindTrigger
      use:bindTrigger
      class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none focus:ring-0 active:scale-95 sm:h-9 sm:w-9"
    >
      {#if user?.photoURL}
        <img alt="User Icon" width="40" height="40" src={user?.photoURL} />
      {:else}
        <img alt="User Icon" width="15" height="15" src="/astro.svg" />
      {/if}
    </button>
    <div slot="content">
      <div class="p-2">
        {#if user?.displayName}
          <p class="truncate text-sm font-medium text-gray-900">
            {user?.displayName}
          </p>
        {/if}
        <p class="truncate text-sm text-gray-500">
          {user?.email}
        </p>
      </div>
      <Button href="/dashboard" variant="ghost">
        <DashboardIcon />
        <p class="text-sm">Dashboard</p>
      </Button>

      <form action="/api/auth/signout">
        <Button type="submit" variant="ghost">
          <LogoutIcon />
          <p class="text-sm">Sign out</p>
        </Button>
      </form>
    </div>
  </Popover>
{/if}

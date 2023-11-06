<!-- Meets Guidelines of a dialog modal from w3  -->
<!-- https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ -->

<!-- 
  * Tab:
  Moves focus to the next tabbable element inside the popover.
  If focus is on the last tabbable element inside the popover, moves focus to the first tabbable element inside the popover.
  * Shift + Tab:
  Moves focus to the previous tabbable element inside the popover.
  If focus is on the first tabbable element inside the popover, moves focus to the last tabbable element inside the popover.
  * Escape: 
  Closes the Popover. 
-->
<script lang="ts">
  import { clickOutside, focusTrap, keyDown } from "@/lib/actions";

  let open = false;
  let popoverTrigger: HTMLElement;
  async function closePopover() {
    if (open) {
      open = false;
    }
  }
  // This function updates the aria-expanded attribute
  function updateAria() {
    if (popoverTrigger) {
      // Check if the popoverTrigger is bound
      popoverTrigger.setAttribute("aria-expanded", open ? "true" : "false");
    }
  }
  function togglePopover() {
    open = !open;
    updateAria();
  }

  // Function to be called by the popover trigger
  export function bindTrigger(node: HTMLElement) {
    popoverTrigger = node;
    node.addEventListener("click", togglePopover);
    return {
      destroy() {
        node.removeEventListener("click", togglePopover);
      },
    };
  }
</script>

<div class="relative">
  <!-- Slot for the trigger.  -->
  <slot name="trigger" {bindTrigger} />

  {#if open}
    <div
      use:focusTrap
      use:clickOutside={[closePopover, popoverTrigger]}
      use:keyDown={[open, closePopover, ["Escape"]]}
      tabindex="-1"
      class="absolute right-0 z-50 mt-2 w-56 rounded-md border border-gray-200 shadow-lg p-2 bg-white will-change-transform animate-slide-up-fade"
      role="dialog"
      aria-labelledby="popoverTitle"
      aria-modal="true"
    >
      <!-- Slot for the Popover Content.  -->
      <slot name="content" />
    </div>
  {/if}
</div>

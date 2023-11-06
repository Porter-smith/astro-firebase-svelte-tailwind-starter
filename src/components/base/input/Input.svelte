<script lang="ts">
  export let type: "email" | "text" | "password" | "number" = "text";
  export let placeholder = "";
  export let id = "";
  export let value = "";
</script>

<!-- * Using {...{ type }} to handle dynamic types in Svelte - see: https://stackoverflow.com/questions/57392773/error-type-attribute-cannot-be-dynamic-if-input-uses-two-way-binding -->
<input
  bind:value
  {...{ type }}
  {...$$restProps}
  {placeholder}
  {id}
  required
  class="appearance-none rounded-md block w-full px-3 py-2 border border-black/20 placeholder-black/80 text-black focus:outline-none focus:z-10 sm:text-sm"
/>

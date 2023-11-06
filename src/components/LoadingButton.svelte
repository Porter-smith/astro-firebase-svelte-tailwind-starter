<script>
  import { Button } from "./base/button";
  import Spinner from "./icons/Spinner.svelte";
</script>

<!-- $$restProps let you be able to pass props to the LoadingButton Component 
  example: need to change varient or add classes etc.. 
-->
<Button {...$$restProps} disabled>
  <Spinner />
  Please wait
</Button>

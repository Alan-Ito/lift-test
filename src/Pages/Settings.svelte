<script>
    import { onMount } from "svelte";
    import { getContext } from 'svelte';
    import { notifications } from '../stores/notifications';
  </script>
  
  <div>
    <h2>Settings</h2>
    <p>通知数: {$notifications}</p>
  </div>

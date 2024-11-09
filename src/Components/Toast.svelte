<script>
    import { onMount } from 'svelte';
    import { notification_list } from '../stores/notifications';
    import { fly, fade } from 'svelte/transition';
    import { Toast } from 'flowbite-svelte';
    import { UserAddOutline } from 'flowbite-svelte-icons';
  
    function removeNotification(index) {
      notification_list.update(n => n.filter((_, i) => i !== index));
    }
  </script>
  
  <style>
    .toast-container {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 10px;
        z-index: 9999; /* 高い値を設定して一番手前に表示 */
    }
  </style>
  

<div class="toast-container">
{#each [...$notification_list] as notification, index (notification.id)}
<!-- divで囲うとfade inにtransitionを反映できた -->
<div transition:fly={{ x: 200 }} class="mb-4" style="z-index: 9999;">
    <Toast transition={fly} params={{ x: 200 }} color="green">
        <UserAddOutline slot="icon" class="w-6 h-6" />
        {notification.message}
    </Toast>
</div>
{/each}
</div>

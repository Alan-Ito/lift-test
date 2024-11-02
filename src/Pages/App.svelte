<script lang="ts">
  import type { Route } from "@mateothegreat/svelte5-router";
  import { route, Router, QueryString } from "@mateothegreat/svelte5-router";
  import Homepage from './Homepage.svelte';
  import About from './About.svelte';
  import Settings from './Settings.svelte';

  const query = new QueryString();

  const routes: Route[] = [
    {
      path: "/",
      component: Homepage
    },
    {
      path: "about",
      component: About,
    },
    {
      path: "settings",
      component: Settings
    }
  ];
</script>

<div class="flex gap-2">
  <a use:route href="/">Home</a>
  <a use:route href="/about">About</a>
  <a use:route href="/settings">Settings</a>
</div>

<Router base="/" {routes} />

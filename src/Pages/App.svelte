<script lang="ts">
  // Importing router
  import type { Route } from "@mateothegreat/svelte5-router";
  import { route, Router, QueryString } from "@mateothegreat/svelte5-router";

  // Importing UI components
  import { BottomNav, BottomNavItem, Skeleton, ImagePlaceholder } from 'flowbite-svelte';
  import { HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid } from 'flowbite-svelte-icons';

  // Importing pages
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

<BottomNav position="fixed" classInner="grid-cols-5">
  <BottomNavItem btnName="Home">
    <a use:route href="/">
      <HomeSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
  <BottomNavItem btnName="About">
    <a use:route href="/about">
      <WalletSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
  <BottomNavItem btnName="Settings">
    <a use:route href="/settings">
      <AdjustmentsVerticalOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
  <BottomNavItem btnName="Profile">
    <UserCircleSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
  </BottomNavItem>
  <BottomNavItem btnName="Profile2">
    <UserCircleSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
  </BottomNavItem>
</BottomNav>

<Router base="/" {routes} />

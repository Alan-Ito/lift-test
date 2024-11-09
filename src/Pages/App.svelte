<script lang="ts">
  // Importing router
  import type { Route } from "@mateothegreat/svelte5-router";
  import { route, Router, QueryString } from "@mateothegreat/svelte5-router";

  // Importing UI components
  import { BottomNav, BottomNavItem, Skeleton, ImagePlaceholder } from 'flowbite-svelte';
  import { HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid } from 'flowbite-svelte-icons';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  // Importing pages
  import Homepage from './Homepage.svelte';
  import About from './About.svelte';
  import Settings from './Settings.svelte';

  import { onMount } from 'svelte';
  import echo from '../lib/echo.js';

  // プレイヤーのインターフェース
  interface Player {
    id: number;
    name: string;
    age: number;
    position: string;
    team: string;
    created_at: string;
    updated_at: string;
  }

  let players: Player[] = [];

  // onMountでリアルタイム通信を設定
  onMount(() => {
    console.log('onMount');
    // プレイヤーの追加イベントをリッスン
    // （listenのイベント名はドットを先頭につけないとうまく動かない。自分で命名した場合のみの仕様？）
    echo.channel('player-added')
      .listen('.added', (e: any) => {
        console.log('Player added event received:', e);
        const playerData = e.player;
        players = [...players, playerData];
        console.log('Updated players list:', players);
      });
      // デバッグ用のログ
    echo.connector.pusher.connection.bind('connected', () => {
      console.log('WebSocket connected');
    });

    echo.connector.pusher.connection.bind('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });

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

<style>
  .table-container {
    max-height: calc(100vh - 60px); /* Adjust the height as needed */
    overflow-y: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
</style>

<div class="table-container">
<Table striped={true} width=100%>
  <TableHead>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Age</TableHeadCell>
    <TableHeadCell>Position</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
      {#each players as player}
          <TableBodyRow>
              <TableBodyCell>{player.name}</TableBodyCell>
              <TableBodyCell>{player.age}</TableBodyCell>
              <TableBodyCell>{player.position}</TableBodyCell>
          </TableBodyRow>
      {/each}
  </TableBody>
</Table>
</div>


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

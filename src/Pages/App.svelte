<script lang="ts">
  // Importing router
  import type { Route } from "@mateothegreat/svelte5-router";
  import { route, Router, QueryString } from "@mateothegreat/svelte5-router";

  // Importing UI components
  import { BottomNav, BottomNavItem, Skeleton, ImagePlaceholder } from 'flowbite-svelte';
  import { HomeSolid, WalletSolid, AdjustmentsVerticalOutline, UserCircleSolid, UsersGroupSolid, PlayOutline, PlaySolid } from 'flowbite-svelte-icons';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  import { Button, Indicator } from 'flowbite-svelte';

  import Toast from '../Components/Toast.svelte';

  // Importing pages
  import Homepage from './Homepage.svelte';
  import About from './About.svelte';
  import Settings from './Settings.svelte';
  import Match from './Match.svelte';
  import Teams from './Teams.svelte';
  import TeamDetails from "./TeamDetails.svelte";

  import { onMount } from 'svelte';
  import echo from '../lib/echo';

  import { notifications, notification_list } from '../stores/notifications';

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
        notifications.update(n => n + 1);// 通知数を増やす
        console.log('Updated players list:', players);
        console.log("notifications:", $notifications);
        // 通知メッセージを追加
        notification_list.update(n => [...n, { id: Date.now(), message: 'Player added: ' + playerData.name }]);
      });
      // デバッグ用のログ
    echo.connector.pusher.connection.bind('connected', () => {
      console.log('WebSocket connected');
    });

    echo.connector.pusher.connection.bind('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });


  function truncateString(string, max) {
    return string.length > max ? string.slice(0, max) + '...' : string;
  }

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
      component: Settings,
    },
    {
      path: "match",
      component: Match,
    },
    {
      path: "teams",
      component: Teams,
    },
    {
      path: "teamdetails",
      component: TeamDetails,
    }
  ];
</script>

<style>

</style>

<Toast />

<BottomNav position="fixed" classInner="grid-cols-5">
  <BottomNavItem btnName="Home">
    <a use:route href="/">
      <HomeSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
  <BottomNavItem btnName="Players">
    {#if $notifications > 0}
    <Button class="relative" size="sm" style="background: transparent; width: 0; height: 0; padding: 0; border: none;">>
      <span class="sr-only">Notifications</span>
      <Indicator color="red" border size="xl" placement="top-right" class="text-xs font-bold">{$notifications}</Indicator>
    </Button>
    {/if}
    <a use:route href="/about">
      <UsersGroupSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
  <BottomNavItem btnName="Settings">
    <a use:route href="/settings">
      <AdjustmentsVerticalOutline class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
  <BottomNavItem btnName="Match">
    <a use:route href="/match">
    <PlaySolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
  <BottomNavItem btnName="Teams">
    <a use:route href="/teams">
    <UserCircleSolid class="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500" />
    </a>
  </BottomNavItem>
</BottomNav>

<Router base="/" {routes} />

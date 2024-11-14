<script lang="ts">
    import { onMount } from 'svelte';
    import { QueryString } from "@mateothegreat/svelte5-router";

    const urlParams = new URLSearchParams(window.location.search);

    let team_id: string;
    let team: { id: number, name: string, created_at: string, updated_at: string } | null = null;
    let players: Array<{ id: number, name: string, age: number, position: string, created_at: string }> = [];

  
    onMount(async () => {
      const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_ENDPOINT}/team?team_id=${team_id}`);
      const data = await response.json();
      console.log(data);
      team = data.team;
      players = data.players;
    });
  
    $: team_id = urlParams.get('team_id');

    function goBack() {
        const previousPath = document.referrer;
        const query = new QueryString();
        query.clear();
        query.goto('/teams');
    }
  </script>
  
  <div>
    <button on:click={goBack}>元に戻る</button>
    {#if team}
      <h1>{team.name}</h1>
      <h2>選手一覧</h2>
      <ul>
        {#each players as player}
          <li>{player.name} - {player.position} ({player.age}歳)</li>
        {/each}
      </ul>
    {/if}
  </div>

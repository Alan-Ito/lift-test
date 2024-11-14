<script lang="ts">
  import { onMount } from 'svelte';

  import { QueryString } from "@mateothegreat/svelte5-router";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';  
  
  import { visitedTeams } from '../stores/visitedPages.js';
  
  interface Team {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }

  let teams: Team[] = [];

  onMount(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_ENDPOINT}/teams`);
      if (!response.ok) {
        console.error('response.ok:', response.ok);
        console.error('esponse.status:', response.status);
        console.error('esponse.statusText:', response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      teams = await response.json();
      console.log('teams:', teams);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  });

  console.log(`${import.meta.env.VITE_LARAVEL_API_ENDPOINT}/teams`);

  function truncateString(string, max) {
    return string.length > max ? string.slice(0, max) + '...' : string;
  }

  function gotoTeamDetailsPage(team_id){
    // クリックされたリンクをストアに追加
    visitedTeams.update(set => {
      set.add(team_id);
      return set;
    });
    console.log($visitedTeams);
    const query = new QueryString();
    query.set("team_id", team_id);
    query.goto("/teamdetails");
  }
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
  .team-link {
    color: rgb(50, 50, 255);
    cursor: pointer;
  }
  .team-link.visited {
    color: rgb(128, 0, 128); /* 紫色 */
  }
</style>

<div class="table-container">
<Table striped={true} width=100%>
    <TableHead>
      <TableHeadCell>チーム名</TableHeadCell>
      <TableHeadCell>ID</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each teams as team}
            <TableBodyRow>
                <TableBodyCell>
                  <!-- チーム名をハイパーリンク風に表示 -->
                  <a class="team-link" href={`teamdetails/?team_id=${team.id}`} tabindex="0" on:click|preventDefault={() => gotoTeamDetailsPage(team.id)} on:keydown={(e) => e.key === 'Enter' && gotoTeamDetailsPage(team.id)} role="link" class:visited={$visitedTeams.has(team.id)}>
                    {team.name}
                  </a>
                </TableBodyCell>
                <TableBodyCell>{team.id}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
  </Table>
</div>

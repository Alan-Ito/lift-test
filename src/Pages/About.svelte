<script lang="ts">
    import { onMount } from 'svelte';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
  
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
  
    onMount(async () => {
      const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_ENDPOINT}/players`);
      players = await response.json();
    });

    console.log(import.meta.env.VITE_LARAVEL_API_ENDPOINT);
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
    div#app {
    overflow: hidden;
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

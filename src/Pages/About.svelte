<script lang="ts">
    import { onMount } from 'svelte';
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge } from 'flowbite-svelte';
    import { notifications } from '../stores/notifications';
  
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
      try {
        const response = await fetch(`${import.meta.env.VITE_LARAVEL_API_ENDPOINT}/players`);
        if (!response.ok) {
          console.error('response.ok:', response.ok);
          console.error('esponse.status:', response.status);
          console.error('esponse.statusText:', response.statusText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        players = await response.json();
        console.log(players);
        console.log(typeof(players));
      } catch (error) {
        console.error('Error fetching players:', error);
      }
      $notifications = 0;
  });

    console.log(`${import.meta.env.VITE_LARAVEL_API_ENDPOINT}/players`);

    function truncateString(string, max) {
      return string.length > max ? string.slice(0, max) + '...' : string;
    }

  // ポジションを略称に変換する関数
  function abbreviatePosition(position) {
    const positionMap = {
      'Forward': 'FW',
      'Defender': 'DF',
      'Midfielder': 'MF',
      'Goalkeeper': 'GK'
    };
    return positionMap[position] || position;
  }

   // ポジションを略称に変換する関数
   function positionToColor(position) {
    position = abbreviatePosition(position);
    const positionColorMap = {
      'FW': 'yellow',
      'DF': 'blue',
      'MF': 'green',
      'GK': 'purple'
    };
    return positionColorMap[position] || "white";
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
</style>

<div class="table-container">
<Table striped={true} width=100%>
    <TableHead>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Age</TableHeadCell>
      <TableHeadCell>Pos</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each players as player}
            <TableBodyRow>
                <TableBodyCell>{truncateString(player.name, 16)}</TableBodyCell>
                <TableBodyCell>{player.age}</TableBodyCell>
                <TableBodyCell>
                  <Badge large color={positionToColor(player.position)}>{abbreviatePosition(player.position)}</Badge>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
  </Table>
</div>

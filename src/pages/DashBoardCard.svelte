<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import EsriMap from '../ui/EsriMap.svelte';

    export let url;
    export let path;
    let Tickets = [];
    let ticketCount = 0;
    let mapAvailable = false;
     onMount(async () => {
        
        const res = await fetch(url + path);
        
        let hold = await res.json();
        Tickets = (hold) ? hold['data'] : [];
        console.log(Tickets);
        
        
        ticketCount = Tickets.length;
        
     });

    function MapError() {
        mapAvailable = false;
    }

    function test(index) {
        console.log("AM RUNNING");
        
        console.log(Tickets[index]);
        Tickets[index].MapView = !Tickets[index].MapView;    
    }

</script>
<style>
   
	.gridDash {
        padding-left:10%;
		display: grid;
		grid-template-columns: 20% 20% 20% 20%;
        grid-gap: 2%;
	}

    .card {
        margin-top: 0 !important;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }

</style>
 <button out:fade style="position: fixed; bottom: 10px; right: 10px;" class="action-button rotate-minus bg-red fg-white">
    <span style="font-size: 18px; font-weight: bold;">{ticketCount}</span>
</button>
<div class="contanier-fluid gridDash">
    
    {#each Tickets as ticket, i}
         <div in:fly="{{ y: 200, duration: 2000 }}" out:fade class="card">
            <div class="card-header">
                <div class="avatar">
                    <img src="../assets/globe-map-icon.webp" alt="Map Preview">
                </div>
                <div class="name">{ticket.cfirst_name + " " + ticket.clast_name}</div>
                <div class="date">{ticket.created_date}</div>
            </div>
            <div on:click={() => {test(i)}} class:p-2={!ticket.MapView} class="card-content">
            <input type=checkbox bind:checked={ticket.MapView}>
                {#if ticket.MapView}
                     <!-- content here -->
                     <EsriMap on:MapError={MapError} pictureURLMarker={"../../assets/PurpleShinyPin.png"} center={[ ticket.longy,ticket.lat]} idTicket={ticket.id_ticket} />
                {:else}
                     <!-- else content here -->
                     <img  src="../../assets/globe-map-icon.webp" alt="Map Preview">
                {/if}
                
            </div>
            <div class="card-footer">
                <button class="button secondary mif-file-archive"></button>
                <button class="button secondary mif-folder-open"></button>
                <button class="button secondary mif-share"></button>
            </div>
        </div>

    {/each}
</div>
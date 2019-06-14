<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import CardContentFooter from '../ui/CardContentFooter.svelte';

    export let url;
    export let path;
    let Tickets = [];
    let ticketCount = 0;
    let mapAvailable = false;
     onMount(async () => {
        
        const res = await fetch(url + path);
        
        let hold = await res.json();
        Tickets =  (hold) ? hold['data'] : []; 
        ticketCount = Tickets.length;
        
     });

   
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
</style>
 <button out:fade style="position: fixed; bottom: 10px; right: 10px;" class="action-button rotate-minus bg-red fg-white">
    <span style="font-size: 18px; font-weight: bold;">{ticketCount}</span>
</button>
<div class="contanier-fluid gridDash">
    
    {#each Tickets as ticket, i}
         <div in:fly={{ y: 200, duration: 2000 }} out:fade class="card">
            <div class="card-header">
                <div class="avatar">
                    <img src="../assets/globe-map-icon.webp" alt="Map Preview">
                </div>
                <div class="name">{ticket.cfirst_name + " " + ticket.clast_name}</div>
                <div class="date">{ticket.created_date}</div>
            </div>
            <CardContentFooter x={ticket.longy} y={ticket.lat}></CardContentFooter>
        </div>

    {/each}
</div>
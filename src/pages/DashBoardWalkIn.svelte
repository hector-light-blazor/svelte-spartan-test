<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    export let url;
    let walkInTickets = [];
     onMount(async () => {

        const res = await fetch(url + "addressticket/getAllWalkIn/");
        
        let hold = await res.json();
         walkInTickets = (hold) ? hold['data'] : [];
        console.log(walkInTickets);
     });
</script>
<style>
   
	.gridDash {

		display: grid;
		grid-template-columns: 280px 280px 280px;
        grid-gap: 10px;
	}

    .card {
        margin-top: 0 !important;
    }

</style>

<div class="contanier gridDash">
    
    {#each walkInTickets as ticket}
         <div in:fly="{{ y: 200, duration: 2000 }}" out:fade class="card">
            <div class="card-header">
                <div class="avatar">
                    <img src="./assets/globe-map-icon.webp" alt="Map Preview">
                </div>
                <div class="name">{ticket.cfirst_name + " " + ticket.clast_name}</div>
                <div class="date">{ticket.created_date}</div>
            </div>
            <div class="card-content p-2">
                <img src="./assets/globe-map-icon.webp" alt="Map Preview" style="width: 100%">
            </div>
            <div class="card-footer">
                <button class="button secondary mif-file-archive"></button>
                <button class="button secondary mif-folder-open"></button>
                <button class="button secondary mif-share"></button>
            </div>
        </div>

    {/each}
</div>
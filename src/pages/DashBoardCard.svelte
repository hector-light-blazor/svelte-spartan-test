<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    export let url;
    export let path;
    let Tickets = [];
     onMount(async () => {

        const res = await fetch(url + path);
        
        let hold = await res.json();
        Tickets = (hold) ? hold['data'] : [];
        
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

<div class="contanier-fluid gridDash">
    
    {#each Tickets as ticket}
         <div in:fly="{{ y: 200, duration: 2000 }}" out:fade class="card">
            <div class="card-header">
                <div class="avatar">
                    <img src="../assets/globe-map-icon.webp" alt="Map Preview">
                </div>
                <div class="name">{ticket.cfirst_name + " " + ticket.clast_name}</div>
                <div class="date">{ticket.created_date}</div>
            </div>
            <div class="card-content p-2">
                <img src="../assets/globe-map-icon.webp" alt="Map Preview" style="width: 100%">
            </div>
            <div class="card-footer">
                <button class="button secondary mif-file-archive"></button>
                <button class="button secondary mif-folder-open"></button>
                <button class="button secondary mif-share"></button>
            </div>
        </div>

    {/each}
</div>
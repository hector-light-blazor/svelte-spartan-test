<script>
     
     import CheckBox from './CheckBox.svelte';
     import EsriMap from './EsriMap.svelte';  
     export let x;
     export let y;
     let MapView = false;
     export function toggleMapView(value) {
        MapView = value;
     }
    async function MapError() {
        
        MapView = false;
       
        
     }
</script>
<style>
    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>
<div  class:p-2={!MapView} class="card-content">
    {#if MapView}  
        <EsriMap on:MapError={MapError} pictureURLMarker={"../../assets/PurpleShinyPin.png"} center={[ x, y]} />
    {:else}
        <img  src="../../assets/globe-map-icon.webp" alt="Map Preview">
    {/if}       
</div>
    <div class="card-footer">
            <CheckBox checkDefaultValue={MapView} on:checkmark={(event)=>{toggleMapView(event.detail.value)}}></CheckBox>
            <button class="button secondary mif-file-archive"></button>
            <button class="button secondary mif-folder-open"></button>
            <button class="button secondary mif-share"></button>
    </div>
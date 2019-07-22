<script>
   import {createEventDispatcher} from 'svelte';
   import Window from './Window.svelte';
   import WebView from './WebView.svelte';
    let dockable = false;
    let buttons  = [{caption: "HCAD", src: "http://propaccess.hidalgoad.org/clientdb/?cid=1", activate: false},
            {caption: "HCAD MAP", src: "http://propaccess.hidalgoad.org/mapSearch/?cid=1", activate: false}];
    let trackIndex;
    let title;
    let src;
    const dispatch = createEventDispatcher();

    function setActivation(index) {
        if(trackIndex > -1) {
            buttons[trackIndex].activate = false;
        }


        dockable = true;
        buttons[index].activate = true;
        title = buttons[index].caption;
        src = buttons[index].src;
        trackIndex = index;
    }

    function reset() {
        buttons[trackIndex].activate = false;
        trackIndex = -1;
        
    }

</script>
<style> 

    .btnSelected {
       color: #CAB448;
       background: transparent !important;
        border: 1px solid #243C73;
    }
    button{
        width: 80px;
        height: 82px;
        background: #243C73;
        color: white;
        overflow: hidden;
    }
    .shortcut {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .shortcut:hover {
        background: transparent !important;
        border: 1px solid #243C73;
        color: #CAB448;
    }
    
    .innerCenter {
        margin: 0 auto;
        display: table;
        width: 50%;
    }
</style>
<div  style="background: #05173F; width: 8%; border-right: 4px solid #AC9528; height: 100vh;float: left;">
    <div class="innerCenter">

        {#each buttons as item, i}
             <button on:click={()=>{setActivation(i)}} class:btnSelected={item.activate} class="shortcut rounded">
                <span class="caption">{item.caption}</span>
                <img  alt="Web" src="../assets/chrome-brands.svg" class="icon">
             </button>
        {/each}
       
    </div>
    
    <div id="targetCycle" class="innerCenter">
        <button  class="shortcut rounded">
            <span class="mif-plus icon"></span>
        </button>
    </div>
    
</div>


{#if dockable}
   <Window on:close={(event)=> {dockable = event.detail;reset()}} {title}>
      <WebView  {src}></WebView>
   </Window>
{/if}

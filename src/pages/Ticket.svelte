<script>


   import { fade } from 'svelte/transition';
   
    //First Lets figure out if the page has change or refresh..
    let href = (window.location.href.includes("#")) ? window.location.href.split("#")[1]: 'customerData';
    

    let active = href;

    export let option = "hello";

    $: ido = (option == "TICKET") ? "hello world" : " none ";
    $: customerData = (active === 'customerData') ? '' : 'none';
    $: premisesData = (active === 'premisesData') ? '' : 'none';
    $: lv      = (active === 'lv') ? '' : 'none';
    $: db      = (active === 'db') ? '' : 'none';
    $: gis     = (active === 'gis') ? '' : 'none';
    $: comment = (active === 'comment') ? '' : 'none';
    $: history = (active === 'history') ? '' : 'none';
    $: msg     = (active === 'msg') ? '' : 'none';

</script>
<div class="tabs tabs-wrapper top tabs-expand" >

    <ul class="tabs-list">
        <li on:click="{() => active = 'customerData'}" 
                class:active="{active === 'customerData'}"><a href="#customerData">CUSTOMER DATA</a>
        </li>
        <li on:click="{() => active = 'premisesData'}" 
                class:active="{active === 'premisesData'}"><a href="#premisesData">PREMISES DATA</a>
        </li>
        <li on:click="{() => active = 'lv'}" 
                class:active="{active === 'lv'}"><a href="#lv">LOCATION VALIDATION PROCESS</a>
        </li>
        <li on:click="{() => active = 'db'}" 
                class:active="{active === 'db'}"><a href="#db">DATABASE VALIDATION PROCESS</a>
        </li>
        <li on:click="{() => active = 'gis'}" 
                class:active="{active === 'gis'}"><a href="#gis">GIS VALIDATION PROCESS</a>
        </li>
        <li on:click="{() => active = 'comment'}" 
                class:active="{active === 'comment'}"><a href="#comment">Comments Feed - </a>
        </li>
        <li on:click="{() => active = 'history'}" 
                class:active="{active === 'history'}" ><a  href="#history">CONNECTIONS - </a>
        </li>
        <li on:click="{() => active = 'msg'}" 
                class:active="{active === 'msg'}"><a  href="#msg">MESSAGES - </a></li>
    </ul>    

    <div class="border bd-default no-border-top p-2">
        <div transition:fade   style="display: {customerData}" id="customerData">
              <p >A falsis, calceus altus racana.</p>  
        </div>
        <div  style="display: {premisesData}" id="premisesData">
                The shield is a post-apocalyptic nanomachine.
        </div>
        <div  style="display: {lv}" id="lv">
                Cream soup is just not the same without basil
                {ido}
        </div>
</div>   

</div>
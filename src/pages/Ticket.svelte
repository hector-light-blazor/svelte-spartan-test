<script>


   import { fade } from 'svelte/transition';
   
    //First Lets figure out if the page has change or refresh..
    let href = (window.location.href.includes("#")) ? window.location.href.split("#")[1]: 'customerData';
    

    let active = href;
    
    let objectid;
    let walk_in;

    export let action;
    
    //Handle action for the riboon and other actions..
    $: handleAction = (action) ? decideAction(action) : '';
    $: customerData = (active === 'customerData') ? '' : 'none';
    $: premisesData = (active === 'premisesData') ? '' : 'none';
    $: lv      = (active === 'lv') ? '' : 'none';
    $: db      = (active === 'db') ? '' : 'none';
    $: gis     = (active === 'gis') ? '' : 'none';
    $: comment = (active === 'comment') ? '' : 'none';
    $: history = (active === 'history') ? '' : 'none';
    $: msg     = (active === 'msg') ? '' : 'none';


    function decideAction(key) {
            switch (key) {
                case "SAVE":
                action = '';
                console.log(walk_in);
                
                console.log("SAVING")
                break;
                case "DELETE":
                console.log("DELETE")
                break;
                default:
                break;
            }
    }

</script>
<div  class="tabs tabs-wrapper top tabs-expand" >
     <div style="float: left;">
                <h3 >Ticket Number: {objectid}</h3>
     </div>   
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

    <div class="frames border bd-default no-border-top p-2">
        <div transition:fade  class="frame ribbed-white"  style="display: {customerData}" id="customerData">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" />
                
             </div>
             <div class="form-group">
                <label>Last Name</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>9-1-1 Telephone</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>ALT 1 Tele</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>ALT 2 Tele</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Prefered Language</label>
                <select >
                    <option></option>
                    <option>English</option>
                    <option>Spanish</option>
                </select>
             </div>
             <div class="form-group">
                <label>Walk In</label>
                <select bind:value={walk_in}>
                    <option ></option>
                    <option >Yes</option>
                    <option >No</option>
                </select>{walk_in}
             </div>
             <div class="form-group">
                <label>Utilities</label>
                <select >
                    <option ></option>
                    <option >Yes</option>
                    <option >No</option>
                </select>
             </div>
             <div class="form-group">
                <label>Mailing Info</label>
                <input type="text" />
             </div>
        </div>
        <div  style="display: {premisesData}" id="premisesData">
                The shield is a post-apocalyptic nanomachine.
        </div>
        <div  style="display: {lv}" id="lv">
                Cream soup is just not the same without basil
                
        </div>
</div>   

</div>
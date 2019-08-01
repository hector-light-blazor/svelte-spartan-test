<script>
   import { onMount, onDestroy } from 'svelte';
   import { fade } from 'svelte/transition';
  
   import DatePicker from "../ui/DatePicker.svelte";
   import Loading from "../ui/Loading.svelte";
   import Ticket from "../utils/Tickets.js";
   import IMask from 'imask';
    //First Lets figure out if the page has change or refresh..
    let href = (window.location.href.includes("#")) ? window.location.href.split("#")[1]: 'customerData';
    
    let ticket = new Ticket();

    let active = href;
    let loading = true;
   
    let dockable = false;

    export let action;
    export let newTicket;
    export let api;
    
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
   
    //Decide Action is when ribbon press something happens in the ticket form...

    function decideAction(key) {
           switch (key) {
              case "SAVE":
                action = '';
                console.log(ticket);
                
                break;
              case "DELETE":
                break;
              default:
                break;
            } 
    }

     onMount(async () => {
         
         if(newTicket){
            
            // ticket.fetchTicketNumber(api).then(res => res.json())
            // .then(response => 
            // console.log('Success:', response))

         }else{ //Fetch The URL..

         }

         loading = false;
         
         ticket.setUpMask();
     })

     onDestroy(async () => {
      
       ticket.destroyMask();
     });

     function getHCADSubSuggestions(event) { 
       

        var html = event.target;
        if(html.value.length > 3) {
           var term = html.value;

            var subURL = `http://propaccess.hidalgoad.org/ClientDB/Codes.aspx?cid=&term=${term}&type=S`;
           
            var formData = new FormData();
            

            formData.append('url', subURL);
          

            fetch('https://gis.lrgvdc911.org/php/spartan/api/v2/proxy.php', {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', JSON.stringify(response)));
            
            
        }
       

     }


</script>

{#if loading}
    <!-- content here -->
    <Loading />

{/if}


<div  class="tabs tabs-wrapper top tabs-expand" style="height: 660px; overflow: auto;" >
     <div style="float: left;">
                <h3 >Ticket Number: {ticket.objectid}</h3>
     </div>   
    <ul class="tabs-list">
        <li on:click="{() => active = 'customerData'}" 
                class:active="{active === 'customerData'}">
               <span>CUSTOMER DATA</span> 
        </li>
        <li on:click="{() => active = 'premisesData'}" 
                class:active="{active === 'premisesData'}">
                <span>PREMISES DATA</span>
        </li>
        <li on:click="{() => active = 'lv'}" 
                class:active="{active === 'lv'}">
                <span>LOCATION VALIDATION PROCESS</span>
        </li>
        <li on:click="{() => active = 'db'}" 
                class:active="{active === 'db'}">
                <span>DATABASE VALIDATION PROCESS</span>
        </li>
        <li on:click="{() => active = 'gis'}" 
                class:active="{active === 'gis'}">
              <span>
               GIS VALIDATION PROCESS
              </span> 
        </li>
        <li on:click="{() => active = 'comment'}" 
                class:active="{active === 'comment'}">
                <span>Comments Feed - </span>
        </li>
        <li on:click="{() => active = 'history'}" 
                class:active="{active === 'history'}" >
               <span>CONNECTIONS - </span> 
        </li>
        <li on:click="{() => active = 'msg'}" 
                class:active="{active === 'msg'}">
               <span>MESSAGES - </span> 
         </li>
    </ul>    

    <div class="frames border bd-default no-border-top p-2">
        <div transition:fade  class="frame ribbed-white"  style="display: {customerData}" id="customerData">
              <div class="form-group">
                <label>First Name</label>
                <input bind:value={ticket.cfirst_name} type="text" />
                
             </div>
             <div class="form-group">
                <label>Last Name</label>
                <input bind:value={ticket.clast_name} type="text" />
             </div>
             <div class="form-group">
                <label>9-1-1 Telephone</label>
                <input bind:value={ticket.telephone_land_line} bind:this={ticket.tele_object} type="text" />
             </div>
             <div class="form-group">
                <label>ALT 1 Tele</label>
                <input bind:value={ticket.alt_telephone} bind:this={ticket.alt_object}  type="text" />
             </div>
             <div class="form-group">
                <label>ALT 2 Tele</label>
                <input bind:value={ticket.alt2_telephone} bind:this={ticket.alt2_object} type="text" />
             </div>
             <div class="form-group">
               <label>Email</label>
               <input bind:value={ticket.cemail} type="email"  />
             </div>
             <div class="form-group">
               <label>
                  ALT E-mail
               </label>
               <input bind:value={ticket.cemail} type="email" />
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
                <select >
                    <option ></option>
                    <option >Yes</option>
                    <option >No</option>
                </select>
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
                <input  type="text" />
             </div>
        </div>
        <div  style="display: {premisesData}" id="premisesData">
              <div class="form-group">
                <label>Owner First Name</label>
                <input  type="text" />
             </div>
             <div class="form-group">
                <label>Owner Last Name</label>
                <input  type="text" />
             </div>
             <div class="form-group">
                <label on:click={()=>{ dockable = true;}}>Subdivision</label>
                <input  on:keyup={getHCADSubSuggestions} type="text" />
             </div>
             <div class="form-group">
                <label>Block Number</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Lot Number</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Tax Account</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Property Id</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Street</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Intersection</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Building Description</label>
                <textarea ></textarea>
             </div>
             
        </div>
        <div  style="display: {lv}" id="lv">
              <div class="form-group">
                <label>Address Number</label>
                <input type="number" />
             </div>
             <div class="form-group">
                <label>Pre Directional</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Road Name</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Street Type</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Post Directional</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Unit</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>MSAG Comm</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Postal Comm</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Full Address</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Address By</label>
                <input placeholder="CLICK HERE TO STAMP" type="text" />
             </div>
             <div class="form-group">
                <DatePicker />
             </div>
        </div>
   </div>
</div>

<style>
   ul.tabs-list > li:hover {
      cursor: pointer;
   }

   .tabs>ul.tabs-list>li>span {
    padding: .5rem 1rem;
    background-color: inherit;
    color: inherit;
    text-decoration: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
</style>
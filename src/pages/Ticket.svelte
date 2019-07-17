<script>
   import { onMount, onDestroy } from 'svelte';
   import { fade } from 'svelte/transition';
   import Window from '../ui/Window.svelte';
   import WebView from '../ui/WebView.svelte';
   import DatePicker from "../ui/DatePicker.svelte";
   import IMask from 'imask';
    //First Lets figure out if the page has change or refresh..
    let href = (window.location.href.includes("#")) ? window.location.href.split("#")[1]: 'customerData';
    

    let active = href;
    let id_ticket;
    let objectid = 0;
    let started_ticket;
    let cfull_name;
    let cfirst_name;
    let clast_name;
    let telephone_land_line = "";
    let alt_telephone = "";
    let alt2_telephone = "";
    let alt3_telephone = "";
    let alt4_telephone;
    let walk_in;

    let tele_object;
    let alt_object;
    let alt2_object;
    let tele_mask;
    let alt_mask;
    let alt2_mask;
    let dockable = false;

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
   
    //Decide Action is when ribbon press something happens in the ticket form...

    function decideAction(key) {
           switch (key) {
              case "SAVE":
                action = '';
                break;
              case "DELETE":
                break;
              default:
                break;
            } 
    }

     onMount(async () => {

         //Once the component is mounted lets add mask to the certain telephone numbers....
          var maskOptions = {
                mask: '(000) 000-0000'
          };
          tele_mask = IMask(tele_object, maskOptions);
          alt_mask = IMask(alt_object, maskOptions);
          alt2_mask = IMask(alt2_object, maskOptions);
     })

     onDestroy(async () => {
        console.log("TICKET OBJECT DESTROY");      
        
        //prevent memory leaks...
        tele_mask.destroy();
        alt_mask.destroy();
        alt2_mask.destroy();
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

{#if dockable}
   <Window on:close={(event)=> {dockable = event.detail;}} title="Hidalgo Appraisal District">
      <WebView  src="http://propaccess.hidalgoad.org/clientdb/?cid=1"></WebView>
   </Window>
{/if}


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
                <input bind:this={tele_object} bind:value={telephone_land_line} type="text" />
             </div>
             <div class="form-group">
                <label>ALT 1 Tele</label>
                <input bind:this={alt_object} type="text" />
             </div>
             <div class="form-group">
                <label>ALT 2 Tele</label>
                <input bind:this={alt2_object} type="text" />
             </div>
             <div class="form-group">
               <label>Email</label>
               <input type="email"  />
             </div>
             <div class="form-group">
               <label>
                  ALT E-mail
               </label>
               <input type="email" />
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
                <input type="text" />
             </div>
        </div>
        <div  style="display: {premisesData}" id="premisesData">
              <div class="form-group">
                <label>Owner First Name</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label>Owner Last Name</label>
                <input type="text" />
             </div>
             <div class="form-group">
                <label on:click={()=>{ dockable = true;}}>Subdivision</label>
                <input on:keyup={getHCADSubSuggestions} type="text" />
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
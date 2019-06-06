<script>
    import { Router, Route, Link } from 'svero';
    import About from './About.svelte';
    import Ticket from '../pages/Ticket.svelte';
    let current = 'home';

    let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);


    console.log(iOS);
</script>
<style>
    span img  {
        width: 50px !important;height:50px !important;
    }
</style>

<nav data-role="ribbonmenu" class="ribbon-menu" data-role-ribbonmenu="true">
     <ul class="tabs-holder">
            <li class="static">
                <a>ONLINE</a>
            </li>
            <li on:click="{() => current = 'home'}" 
                class:active="{current === 'home'}">
                <a>TICKET</a>
            </li>
            <li on:click="{() => current = 'sub'}" 
                class:active="{current === 'sub'}">
                <a>SUBDIVISION</a>
            </li>
            <li on:click="{() => current = 'nrf'}" 
                class:active="{current === 'nrf'}" >
                <a>NRF'S</a>
            </li>
            <li on:click="{() => current = 'gis'}" 
                class:active="{current === 'gis'}">
                <a>GIS</a>
            </li>
            <li on:click="{() => current = 'settings'}" 
                class:active="{current === 'settings'}">
                <a>SETTINGS</a>
            </li>
      </ul>  
       <div class="content-holder">
            <div class:active="{current === 'home'}" class="section" id="section-ticket">
                <div class="group">
                    <button class="ribbon-button">
                            <span >
                                {#if iOS}
                                    <img loading="lazy" src="./assets/dashboard.png" alt="dashboard">
                                {:else}
                                   <img loading="lazy" src="./assets/dashboard.webp" alt="dashboard">
                                {/if}
                            </span>
                        <span class="caption">Dashboard</span>
                    </button>
                    <button class="ribbon-button">
                            <span >
                                <img loading="lazy" src="./assets/calendar.webp" alt="Calendar">
                            </span>
                        <span class="caption">Calendar</span>
                    </button>
                     <button class="ribbon-button">

                     <Link href="/spartan-svelte/about" className="btn"><span  >
                                <img loading="lazy" src="./assets/cabinet.webp" alt="Archive">
                            </span></Link>
                            
                        <span class="caption">Archive</span>
                    </button>
                     <button class="ribbon-button">
                           
                        <span class="caption">Charts</span>
                    </button>

                    <span class="title">Display</span>
                </div>
                <div class="group">
                    <button class="ribbon-button">

                        <Link href="/spartan-svelte/ticket" className="btn">
                                {#if iOS}
                                    <span >
                                        <img loading="lazy" src="./assets/edit.png" alt="New Ticket">
                                     </span>
                                {:else}
                                    <span >
                                        <img loading="lazy" src="./assets/edit.webp" alt="New Ticket">
                                     </span>
                                {/if}
                        </Link>
                            
                        <span class="caption">New</span>
                    </button>

                    <span class="title">Insert</span>
                </div>
                <div class="group">
                    <button class="ribbon-button">
                      <span>
                        <img loading="lazy" src="./assets/filter.webp" alt="Filter">
                      </span>
                      <span class="caption">Filter</span>
                    </button>

                    <span class="title">Records</span>
                </div>

                <div class="group">
                    <div class="input">
                        <input type="text"  >
                        <div class="button-group">
                        <button class="button">
                            <img loading="lazy"  src="./assets/search-solid.svg" alt="Search" >
                        </button>
                        </div>
                        
                    </div>
                    <span class="title">
                        Quick Search
                    </span>
                </div>

            </div>

            <div class:active="{current === 'sub'}" class="section" id="section-subdivision">
                <p class="p-4">Subdivision</p>
            </div>

            <div class:active="{current === 'nrf'}" class="section" id="section-nrf">
                <p class="p-4">Section NRF</p>
            </div>

            <div class:active="{current === 'gis'}" class="section" id="section-gis">
                <p class="p-4">Section GIS</p>
            </div>
            <div class:active="{current === 'settings'}" class="section" id="section-settings">
                <p class="p-4">Section Settings</p>
            </div>
    </div>                 
</nav>


<Router>
  <Route path="/spartan-svelte/about" ><About on:message={() => current = 'home'} /></Route>
  <Route path="/spartan-svelte/ticket" ><Ticket /></Route>
</Router>
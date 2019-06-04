<script>

    let current = 'home';
</script>

<nav data-role="ribbonmenu" class="ribbon-menu" data-role-ribbonmenu="true">
     <ul class="tabs-holder">
            <li class="static">
                <a href="#">ONLINE</a>
            </li>
            <li on:click="{() => current = 'home'}" class:active="{current === 'home'}">
                <a href="#">TICKET</a>
            </li>
            <li on:click="{() => current = 'sub'}" class:active="{current === 'sub'}">
                <a>SUBDIVISION</a>
            </li>
            <li on:click="{() => current = 'nrf'}" class:active="{current === 'nrf'}" ><a >NRF'S</a></li>
            <li ><a >MAP</a></li>
            <li><a >SETTINGS</a></li>
      </ul>  
       <div class="content-holder">
        <div class:active="{current === 'home'}" class="section" id="section-ticket">
            <div class="group">
                <button class="ribbon-button">
                        <span class="icon">
                            <img src="./assets/dashboard.png">
                        </span>
                    <span class="caption">Dashboard</span>
                </button>

                <span class="title">Display</span>
            </div>

        </div>

        <div class:active="{current === 'sub'}" class="section" id="section-subdivision">
            <p class="p-4">Section two</p>
        </div>
        <div class:active="{current === 'nrf'}" class="section" id="section-nrf">
            <p class="p-4">Section three</p>
        </div>
    </div>                 
</nav>
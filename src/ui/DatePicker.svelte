<script>
    import {Months, WeekDays, CalendarPage} from '../utils/Months.js';
    import Week from './Week.svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let enable = false;
    let today = new Date();
    let choosen = new Date();
    let calendars = [];
    let element;
    
    

    $: formatDate = (choosen) ? format():"None";
    $: MonthTitle = Months[today.getMonth()] + " " + today.getFullYear();

    function format() {
        let month = (choosen.getMonth() + 1) ;
        let day = (choosen.getDate() < 10) ? "0" + choosen.getDate() : choosen.getDate();
        month = (month < 10) ? "0" + month : month;

        return choosen.getFullYear() + "-" + month + "-" + day;
    }
    function goBackWards() {
        let month = today.getMonth() - 1; 
        let year = today.getFullYear();
        today = new Date(year, month, 1);
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
        reDraw()
    }
    function goFoward(){
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        today = new Date(year, month, 1);
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
        reDraw()
    }


    function getDaysBackwards(date) {
        var today   = new Date(date);
        var number = date.getDay();
        var days = [];
        for(var x = 0; x < number; x++) {
            var cutDays = number - x;
            today.setDate(today.getDate() - cutDays);
            days.push(new CalendarPage(new Date(today)));
            today = new Date(date);            
        }
        
        return days;
    }

    function getDaysFowards(date) {
        var date = new Date(date);
        var number = 6;
        var days = [];
        for(var x = 0; x < number; x++) {
                days.push(new CalendarPage(new Date(date)));
                date.setDate(date.getDate() + 1);
        }

        return days;
    }

    function daysInMonth(iMonth, iYear) 
    { 
      return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    function getDaysInMonth(today, lastDay) {
        var date = new Date(today);
        
        var month = date.getMonth();
        var lastDay = new Date(lastDay); 
        var calendars = [[], [], [], [], [], []];
        var index = 0;
        if(date.getDay() > 0) {
            calendars[0] = getDaysBackwards(date);; 
            
        }

        console.log(`index ${index}`);
        var days = [];
        
        while (index < 6) {

            if(calendars[index].length < 7) {
                
                calendars[index].push(new CalendarPage(new Date(date)));
                date.setDate(date.getDate() + 1);
             }

             if(calendars[index].length == 7) {
                 index++;
                 days = [];
             }  
        }
        return calendars;
   }

   async function reDrawFromBeg() {
        calendars = [[], [], [], [], [], []]; //reset..
        today = new Date(choosen.getFullYear(), choosen.getMonth(), 1);
        calendars = await getDaysInMonth(today, new Date(today.getFullYear(), today.getMonth(), daysInMonth(today.getMonth(), today.getFullYear())));
        console.log(calendars);
        
   }

   async function reDraw() {
        calendars = [[], [], [], [], [], []]; //reset..
        today = new Date(today.getFullYear(), today.getMonth(), 1);
        calendars = await getDaysInMonth(today, new Date(today.getFullYear(), today.getMonth(), daysInMonth(today.getMonth(), today.getFullYear())));
        console.log(calendars);
   }


</script>
<style>
    .wrapper {
        position: absolute;
        width: 450px;
        height: auto;
        box-shadow:0px 10px 26px rgba(0,0,0,0.4);
        padding:15px;max-width:100%;margin:0 auto
    }
    .label {
        cursor: pointer;
    }
    .heading-section {
        font-size: 20px;
        padding: 24px 15px;
        display: flex;
        justify-content: space-between;
        color: #3d4548;
        font-weight: bold;
    }
    .control {
        opacity: 1;
        cursor: pointer;
    }

    .btn {
        background: #024ea4;
        color: #fff !important;
    }

    .week {  
        display:grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-flow: dense;
        grid-gap: 2px 10px;
    }

    .legend {
        color: #4a4a4a;
    padding: 10px 0;
    margin-bottom: 5px;
    left: 12px;
    }

    .cal {
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        user-select: none;
        padding: 10px;
        padding-top: 0;
    }
    .month-container {
            width: 100%;
            display: -ms-grid;
            display: grid;
    }

</style>
        
<button class:btn={enable} on:click="{() => {enable = !enable;reDrawFromBeg();}}" class="button primary  outline large">{formatDate}</button>
{#if enable}
    <div bind:this={element} transition:fade class="wrapper contents">
        <div class="cal">
             <div class="heading-section">
            <div class="control">
                <span on:click={goBackWards} class="mif-chevron-thin-left"></span>
            </div>
            <div class="label">{MonthTitle}</div> 
            <div class="control">
                    <span on:click={goFoward} class="mif-chevron-thin-right"></span>
            </div>
            </div>
            <div class="legend">
                <div class="week">
                    {#each WeekDays as day}
                        <div class="week-day">{day}</div>
                    {/each}
                </div>
            </div>
            <div class="month-container">
                {#each calendars as page}
                     <!-- content here -->
                     <Week days={page} />
                {/each}
            </div>
        </div>
       
        
    </div>
{/if}


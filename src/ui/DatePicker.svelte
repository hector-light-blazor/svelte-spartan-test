<script>
    import {Months, WeekDays, Calendar} from '../utils/Months.js';
    import Week from './Week.svelte';
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    let enable = false;
    let today = new Date();
    let calendars = [];
    let element;

    $: formatDate = (today) ? format():"None";
    $: MonthTitle = Months[today.getMonth()] + " " + today.getFullYear();
    function format() {
        let month = (today.getMonth() + 1) ;
        let day = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate();
        month = (month < 10) ? "0" + month : month;

        return today.getFullYear() + "-" + month + "-" + day;
    }
    function goBackWards() {
        let month = today.getMonth() - 1; 
        let year = today.getFullYear();
        today = new Date(year, month, 1);
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    }
    function goFoward(){
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        today = new Date(year, month, 1);
        var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
    }

    onMount(async () => {
        let day = today.getDay();

        if(day == 0) {

        }else {
            
        }
        
    });

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

</style>
        
<button class:btn={enable} on:click="{() => {enable = !enable;}}" class="button primary  outline large">{formatDate}</button>
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
        </div>
       
        
    </div>
{/if}


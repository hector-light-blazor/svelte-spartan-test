<script>
    export let days;

</script>
<style>
    .week {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(7, 50px);
    }
    .day {
        margin: 2px;
        color: #4a4a4a;
        font-weight: bold;
        text-align: center;
        font-size: 16px;
        flex: 1 0 auto;
        height: auto;
        display: flex;
        flex-basis: 0;
    }

    .day-label {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        position: relative;
        border: 1px solid #fff;
        border-radius: 50%;
        margin: 10%;
        padding: 0;
        align-items: center;
        background: none;
        cursor: pointer;
        transition: all 100ms linear;
        font-weight: normal;
    }
    
</style>
<div class="week">
    {#each days as day}
         <div class="day">
            <button class="day-label">
            {day.today}
            </button>
         </div>
    {/each}
</div>
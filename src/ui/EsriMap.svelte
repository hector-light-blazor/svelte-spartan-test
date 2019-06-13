<script>
     import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    
    export let idTicket;
    export let center;
    export let lat;
    export let long;
    export let pictureURLMarker;

    let map;
    let mapflex = "https://gis.lrgvdc911.org/arcgis/rest/services/Dynamic/MapFlex/MapServer";
    const dispatch = createEventDispatcher();
   
    
   onMount(async () => {

       await require(["esri/map","esri/layers/ArcGISDynamicMapServiceLayer", "esri/symbols/PictureMarkerSymbol"], function(Map,ArcGISDynamicMapServiceLayer, PictureMarkerSymbol) {
            console.log(esri)
            if (!center[0] && !center[1]) {
                dispatch("MapError");
                return;
            }else {
                center[0] = (typeof center[0] === 'string' || center[0] instanceof String) ? parseFloat(center[0]) : center[0];
                center[1] = typeof center[1] === 'string' || center[1] instanceof String ? parseFloat(center[1]) : center[1];
            }

                map =  new Map(idTicket, {
                center: center,
                zoom: 18,
                slider: false
                });
                map.addLayer(new ArcGISDynamicMapServiceLayer(mapflex));
                map.on("load", (event) => {
                    if(pictureURLMarker){
                        var point = new esri.geometry.Point(center[0], center[1]);
                        var symbol = new PictureMarkerSymbol(pictureURLMarker, 51, 51)
                        map.graphics.add(new esri.Graphic(point, symbol));
                    }
                })
        }); 
    });
    onDestroy(() => { //Destroy the instance of the map...
        map.destroy();
    })
</script>

<div id="{idTicket}">

</div>
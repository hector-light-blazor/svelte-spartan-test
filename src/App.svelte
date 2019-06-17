<script>
	import RibbonToolbar from './ui/RibbonToolbar.svelte';
	import Login from "./pages/Login.svelte";
	import Ticket from './pages/Ticket.svelte';
	let url = "https://gis.lrgvdc911.org/php/spartan/api/v2/index.php/";
</script>

<!-- <Login /> -->
<!-- <Ticket /> -->
<RibbonToolbar url={url} />
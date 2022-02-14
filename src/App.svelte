<script lang="ts">
	import logo from "./assets/svelte.png";
	import Counter from "./lib/Counter.svelte";
	import Tailwindcss from "./Tailwindcss.svelte";
</script>

<Tailwindcss />
<main>
	<img src={logo} alt="Svelte Logo" />
	<h1 class="text-5xl">Hello world!</h1>

	<Counter />
</main>

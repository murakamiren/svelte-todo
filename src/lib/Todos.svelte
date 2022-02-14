<script lang="ts">
	export let todoName: string;
	export let handleRemove;

	let isDone: boolean = false;

	type todoStyles = {
		text: string;
		p: string;
		doneBtn: string;
	};

	const undoneStyle: todoStyles = {
		text: "done",
		p: "w-full",
		doneBtn:
			"shrink-0 py-2 px-4 mx-2 border rounded text-cyan-500 shadow hover:text-white hover:bg-cyan-500 transition ease-out",
	};
	const doneStyle: todoStyles = {
		text: "not done",
		p: "w-full text-emerald-500 line-through",
		doneBtn:
			"shrink-0 py-2 px-4 mx-2 border rounded text-gray-500 shadow hover:text-white hover:bg-gray-500  transition ease-out",
	};

	let isDoneStyle = undoneStyle;

	const handleIsDone = () => {
		isDone = !isDone;
		if (isDone) {
			isDoneStyle = doneStyle;
		} else {
			isDoneStyle = undoneStyle;
		}
	};
</script>

<div class="w-full flex mb-4">
	<p class={isDoneStyle.p}>{todoName}</p>
	<button class={isDoneStyle.doneBtn} on:click={handleIsDone}>{isDoneStyle.text}</button>
	{#if !isDone}
		<button
			class="shrink-0 py-2 px-4 border rounded text-emerald-500 shadow hover:text-white hover:bg-emerald-500 transition ease-out"
		>
			edit
		</button>
	{:else}
		<button
			class="shrink-0 py-2 px-4 border rounded text-red-500 shadow hover:text-white hover:bg-red-500 transition ease-out"
			on:click={handleRemove}>remove</button
		>
	{/if}
</div>

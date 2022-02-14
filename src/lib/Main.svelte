<script lang="ts">
	let test: string = "";
	let todoList: string[] = [];
	let todoInput: string;

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

	const handleSubmit = () => {
		test = todoInput;
		todoList = [...todoList, todoInput];
		todoInput = "";
		console.log(todoList);
	};

	const handleIsDone = () => {
		isDone = !isDone;
		if (isDone) {
			isDoneStyle = doneStyle;
		} else {
			isDoneStyle = undoneStyle;
		}
	};
</script>

<main>
	<div class="flex flex-col items-center">
		<h2 class="pb-1 pt-8 font-bold text-3xl w-8/12 text-cyan-500">Your Todo List</h2>
		<div class="w-8/12 flex justify-center mb-8">
			<input
				type="text"
				class="appearance-none border rounded w-full py-2 px-3 text-gray-500 shadow mr-4 outline-none focus:border-cyan-500 focus:border-2 focus:outline-none"
				placeholder="add todo"
				bind:value={todoInput}
			/>
			<button
				class="py-2 px-4 border rounded font-semibold text-cyan-500 shadow hover:text-white hover:bg-cyan-500 transition ease-out"
				on:click={handleSubmit}>ADD</button
			>
		</div>
		<div class="w-8/12 mb-4">
			{#if todoList.length === 0}
				<p class="text-emerald-500 text-2xl text-center uppercase font-semibold">there is no task!</p>
			{:else}
				{#each todoList as todo}
					<div class="w-full flex mb-4">
						<p class={isDoneStyle.p}>{todo}</p>
						<button class={isDoneStyle.doneBtn} on:click={handleIsDone}>{isDoneStyle.text}</button>
						<button
							class="shrink-0 py-2 px-4 border rounded text-red-500 shadow hover:text-white hover:bg-red-500 transition ease-out"
							>remove</button
						>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</main>

<script lang="ts">
	import { isModalOpen, modalSty, savedTodoNum, whichCloseBtn } from "../store/toggleModal";

	import { todoInputStore } from "../store/todoInput";

	import Todos from "./Todos.svelte";

	type todoListType = {
		id: number;
		txt: string;
	};

	let todoList: todoListType[] = [];
	let todoInput: string;

	const handleSubmit = () => {
		if (todoList.length === 0) {
			todoList = [...todoList, { id: 1, txt: todoInput }];
		} else {
			const lastTodoId: number = todoList.slice(-1)[0].id;
			todoList = [...todoList, { id: lastTodoId + 1, txt: todoInput }];
		}
		todoInput = "";
		console.log(todoList);
	};

	const handleRemove = (i: number) => {
		let aftertodos = todoList;
		aftertodos.splice(i, 1);
		todoList = [...aftertodos];
	};

	const handleEdit = (i: number) => {
		todoInputStore.update(() => todoList[i].txt);
		savedTodoNum.update(() => i);
		isModalOpen.update(() => true);
		modalSty.update(() => "");
		console.log(todoInputStore, isModalOpen);
	};

	const saveEditTodo = () => {
		if ($isModalOpen) {
			// do nothing
		} else {
			let beforeEdit = todoList;
			beforeEdit[$savedTodoNum].txt = $todoInputStore;
			todoList = [...beforeEdit];
		}
	};

	whichCloseBtn.subscribe(() => {
		if (todoList.length === 0) {
			// do nothing
		} else {
			if ($whichCloseBtn === "save") {
				console.log("save");
				saveEditTodo();
				whichCloseBtn.set("");
			} else {
				console.log("cancel");
				whichCloseBtn.set("");
			}
		}
	});
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
				{#each todoList as todo, i (todo.id)}
					<Todos todoName={todo.txt} handleRemove={() => handleRemove(i)} handleEdit={() => handleEdit(i)} />
				{/each}
			{/if}
		</div>
	</div>
</main>

<script lang="ts">
	import { isModalOpen, modalSty, savedTodoNum, whichCloseBtn } from "../store/toggleModal";

	import { todoInputStore } from "../store/todoInput";

	import Todos from "./Todos.svelte";

	type todoListType = {
		id: number;
		txt: string;
		isDone: boolean;
	};

	let todoList: todoListType[] = [];
	let todoInput: string;
	let isFill: boolean = true;
	let selected: string;

	let doneTodoList;
	let unDoneTodoList;

	const handleSubmit = () => {
		if (todoInput === "") {
			isFill = false;
		} else {
			isFill = true;
			if (todoList.length === 0) {
				todoList = [...todoList, { id: 1, txt: todoInput, isDone: false }];
			} else {
				const lastTodoId: number = todoList.slice(-1)[0].id;
				todoList = [...todoList, { id: lastTodoId + 1, txt: todoInput, isDone: false }];
			}
			todoInput = "";
			localStorage.setItem("todoList", JSON.stringify(todoList));
			console.log(todoList);
		}
	};

	const handleRemove = (i: number) => {
		let aftertodos = todoList;
		aftertodos.splice(i, 1);
		todoList = [...aftertodos];
		localStorage.setItem("todoList", JSON.stringify(todoList));
	};

	const isDoneChange = (i: number) => {
		let beforeIsDone = todoList;
		if (beforeIsDone[i].isDone) {
			beforeIsDone[i].isDone = false;
		} else {
			beforeIsDone[i].isDone = true;
		}
		todoList = [...beforeIsDone];
		localStorage.setItem("todoList", JSON.stringify(todoList));
		console.log(todoList);
	};

	const handleSelect = () => {
		if (selected === "done") {
			doneTodoList = todoList.filter((todo) => todo.isDone === true);
		} else if (selected === "not done") {
			unDoneTodoList = todoList.filter((todo) => todo.isDone === false);
		}
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
			localStorage.setItem("todoList", JSON.stringify(todoList));
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

	const getTodosFromLocal = () => {
		const savedTodos = localStorage.getItem("todoList");
		const savedTodosParse = JSON.parse(savedTodos);
		todoList = savedTodosParse;
	};

	window.onload = getTodosFromLocal;
</script>

<main>
	<div class="flex flex-col items-center">
		<h2 class="pb-1 pt-8 font-bold text-3xl w-8/12 text-cyan-500">Your Todo List</h2>
		<div class={!isFill ? "w-8/12 flex justify-center" : "w-8/12 flex justify-center mb-4"}>
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
		{#if !isFill}
			<p class="text-red-500 mb-4 w-8/12 text-sm">you need to fill the form to add task!</p>
		{/if}
		<div class="w-8/12 mb-8">
			<select
				class="rounded w-auto text-sm text-neutral-500 bg-transparent border p-2 shadow"
				bind:value={selected}
				on:change={handleSelect}
			>
				<option value="all">all</option>
				<option value="done">done</option>
				<option value="not done">not done</option>
			</select>
		</div>
		<div class="w-8/12 mb-4">
			{#if todoList.length === 0}
				<p class="text-emerald-500 text-2xl text-center uppercase font-semibold">there is no task!</p>
			{:else if selected === "all"}
				{#each todoList as todo, i (todo.id)}
					<Todos
						todoName={todo.txt}
						handleRemove={() => handleRemove(i)}
						handleEdit={() => handleEdit(i)}
						isDone={todo.isDone}
						isDoneChange={() => isDoneChange(i)}
					/>
				{/each}
			{:else if selected === "done"}
				{#each doneTodoList as todo, i (todo.id)}
					<Todos
						todoName={todo.txt}
						handleRemove={() => handleRemove(i)}
						handleEdit={() => handleEdit(i)}
						isDone={todo.isDone}
						isDoneChange={() => isDoneChange(i)}
					/>
				{/each}
			{:else if selected === "not done"}
				{#each unDoneTodoList as todo, i (todo.id)}
					<Todos
						todoName={todo.txt}
						handleRemove={() => handleRemove(i)}
						handleEdit={() => handleEdit(i)}
						isDone={todo.isDone}
						isDoneChange={() => isDoneChange(i)}
					/>
				{/each}
			{/if}
		</div>
	</div>
</main>

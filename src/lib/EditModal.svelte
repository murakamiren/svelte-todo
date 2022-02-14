<script lang="ts">
	import { isModalOpen, modalSty, savedTodoNum, whichCloseBtn } from "../store/toggleModal";

	import { todoInputStore } from "../store/todoInput";

	const handleModal = () => {
		if ($isModalOpen) {
			modalSty.update(() => "");
		} else {
			modalSty.update(() => "hidden");
		}
	};

	const modalClose = () => {
		isModalOpen.set(false);
		whichCloseBtn.set("cancel");
		handleModal();
	};

	const modalCloseWithSave = () => {
		isModalOpen.set(false);
		whichCloseBtn.set("save");
		handleModal();
	};
</script>

<div class={$modalSty}>
	<div class="bg-neutral-600 w-screen h-screen opacity-70 absolute" />
	<div class="border rounded-lg w-8/12 h-fit absolute top-0 left-0 bottom-0 right-0 m-auto bg-white z-30 opacity-100">
		<p class="text-xl font-semibold uppercase text-neutral-700 p-4">edit todo</p>
		<div class="px-8 border-y flex flex-col py-16">
			<p class="text-neutral-700">change this todo:</p>
			<input
				type="text"
				class="appearance-none border rounded w-full py-2 px-3 text-gray-500 shadow mr-4 outline-none focus:border-cyan-500 focus:border-2 focus:outline-none"
				bind:value={$todoInputStore}
			/>
		</div>
		<div class="flex p-4 py-8">
			<button
				class="py-2 px-4 border rounded font-semibold text-cyan-500 shadow hover:text-white hover:bg-cyan-500 transition ease-out mr-4"
				on:click={modalCloseWithSave}
			>
				save
			</button>
			<button
				class="py-2 px-4 border rounded font-semibold text-red-500 shadow hover:text-white hover:bg-red-500 transition ease-out"
				on:click={modalClose}
			>
				cancel
			</button>
		</div>
	</div>
</div>

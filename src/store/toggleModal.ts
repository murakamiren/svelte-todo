import { writable } from "svelte/store";

export const isModalOpen = writable<boolean>(false);

export const modalSty = writable<string>("hidden");

export const savedTodoNum = writable<number | null>(null);

export const whichCloseBtn = writable<string>("");

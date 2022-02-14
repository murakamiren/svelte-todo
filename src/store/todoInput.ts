import { writable } from "svelte/store";

export const todoInputStore = writable<string>("");

import { derived, writable } from 'svelte/store';

export const ip = "10.10.1.104:3000"

export const port = writable('')

export const connect = derived(port, ($a, set) => {

	const ws = new WebSocket("ws://"+ip+"/"+$a);

	return ws

}, 'one moment...');


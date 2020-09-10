import { derived, writable } from 'svelte/store';

export const ip = "10.10.1.104:3000"

export const port = writable('')

export const ws = derived(port, ($a, set) => {

	return new WebSocket("ws://"+ip+"/"+$a);
	
});


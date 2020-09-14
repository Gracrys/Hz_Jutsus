import { derived, writable, get } from 'svelte/store';

export const ip = "10.10.1.104:3000"

export let port = writable('')
let port1  

const unsubscribe = port.subscribe(val => {
		port1 = val;
	});

export const ws = derived( port, x => new WebSocket("ws://"+ip+"/"+(x))  

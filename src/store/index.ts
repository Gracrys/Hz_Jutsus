import { derived, writable, get } from 'svelte/store';

export const ip = "10.10.1.104:3000"

export const port = writable('101')

export const ws = new WebSocket("ws://"+ip+"/21");

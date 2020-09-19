import { derived, writable, get } from 'svelte/store';
import io from "socket.io-client/dist/socket.io.js"

export const ip = "10.10.1.117:3000"

export let check : bool = writable(true)

export const sc = io.connect('http://' + ip)
// export const ws = derived( port, x => new WebSocket("ws://"+ip+"/"+(x))  

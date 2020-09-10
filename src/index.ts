import { technique, jutsus } from "./jutsus"
import "./style.scss"
import {ws, ip, port} from './store/'
const footerLog: HTMLElement = document.querySelector("footer #logger")
const symbol : HTMLElement= document.querySelector("main .js-symbol")
const symbolDesc : HTMLElement= document.querySelector("main .js-symbol_desc")

//check if it is connected to a port and in main page
let check:boolean = true
port.set(21)

window.onload = e => {

	if(window.location.pathname === "/") check = true;
}

import Modal from './components/modal.svelte';
const app = new Modal({
  target: document.body,
  props: {
  	check ,
  } 
});

if(!check){
	//and the logic of the game

	ws.onmessage = x => console.warn(x.data)

	console.log(jutsus)

	let keyState = ""

	document.body.addEventListener("keydown", e =>{

		footerLog.classList.add("is-logged")

		if((/Enter/i).test(e.key)){
			footerLog.innerText += "-"+e.key
			showSymbol(jutsus[keyState])
			ws.send(keyState)
			keyState = ""

		}	else if((/Backspace/i).test(e.key)){

			keyState = keyState.slice(0, -1)
			footerLog.innerText = keyState

		}	else if((/[a-z]/ig).test(e.key))  {
			keyState += e.key
			footerLog.innerText = keyState
		}
	})

	document.body.addEventListener("keyup", e =>{
		if(e.key == "Enter")
			setTimeout(() => {
				footerLog.classList.remove("is-logged")
				footerLog.innerText = ""
			}, 2000 )
	})

	function showSymbol(x){
		if(x){
			symbol.innerText =  x.symbol 
			symbolDesc.querySelector("h1").innerText = x.kanji
			symbolDesc.querySelector("h3 blockquote").innerText = x.romanji
		}
		// else console.log(x)
	}
}
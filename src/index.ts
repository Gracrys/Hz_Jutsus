import { technique, jutsus } from "./jutsus"
import "./style.scss"
const footerLog: HTMLElement = document.querySelector("footer #logger")
const symbol : HTMLElement= document.querySelector("main .js-symbol")
const symbolDesc : HTMLElement= document.querySelector("main .js-symbol_desc")

const ip = "10.10.1.104:3000"

const ws = new WebSocket("ws://"+ip+"/21");

// <HTMLElement>(node: HTMLElement) => node.innerText
let check:boolean = true

window.onload = e => {

	if(window.location.pathname === "/") check = true;
}

import Modal from './components/modal.svelte';
const app = new Modal({
  target: document.body,
  props: {
  	check ,
  	ip,
  	ws
  } 
});

if(check){

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
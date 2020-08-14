import { technique, jutsus } from "./jutsus"
import "./style.scss"
const footerLog: HTMLElement = document.querySelector("footer #logger")
const symbol : HTMLElement= document.querySelector("main .js-symbol")
const symbolDesc : HTMLElement= document.querySelector("main .js-symbol_desc")
const ip = "10.10.1.122:3000"

// <HTMLElement>(node: HTMLElement) => node.innerText
let check:boolean = true

window.onload = e =>{

	if(window.location.pathname === "/"){

		check = true;
		async function postData(url = '', data = {}) {
				  // Default options are marked with *
		  const response = await fetch(url, {
		    method: 'POST', // *GET, POST, PUT, DELETE, etc.
		    mode: 'cors', // no-cors, *cors, same-origin
		    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		    // credentials: 'include', // include, *same-origin, omit
		    headers: {
		      'Content-Type': 'application/json',
		      // 'Content-Type': 'application/x-www-form-urlencoded',
		       "Accept": "application/json",
		    },
		    // redirect: 'follow', // manual, *follow, error
		    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		    body: JSON.stringify(data) // body data type must match "Content-Type" header
		  });
		  return response.json(); // parses JSON response into native JavaScript objects
		}
		postData('http://'+ip, { answer: 42 })
		  .then(data => {
		    console.log(data); // JSON data parsed by `data.json()` call
		  }.catch( x => console.warn("error");		
		console.warn("modal")	
	}
}

import Modal from './components/modal.svelte';
const app = new Modal({
  target: document.body,
  props: {
  	check 
  } 
});


const ws = new WebSocket("ws://"+ip+"/21");
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
		console.log(keyState)

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

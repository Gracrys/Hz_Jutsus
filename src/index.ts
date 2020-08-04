import { technique, jutsus } from "./jutsus.ts"

const footerLog = document.querySelector("footer #logger")
const symbol = document.querySelector("main .js-symbol")
const symbolDesc = document.querySelector("main .js-symbol_desc")
const ip = "10.10.1.122:3000"

window.onload = e =>{


	if(window.location.pathname === "/"){


		postData('http://'+ip, { answer: 42 })
		  .then(data => {
		    console.log(data); // JSON data parsed by `data.json()` call
		  }.catch( x => console.warn("error");		
		console.warn("modal")	
	}
}

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

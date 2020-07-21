import { technique, jutsus } from "./jutsus.ts"

const footerLog = document.querySelector("footer #logger")
const symbol = document.querySelector("main .js-symbol")
const symbolDesc = document.querySelector("main .js-symbol_desc")

const ws = new WebSocket("ws://10.10.1.120:3000");
ws.onmessage = x => console.warn(x.data)

let keyState = ""

document.body.addEventListener("keydown", e =>{

	footerLog.classList.add("is-logged")

	if((/Enter/i).test(e.key)){
		footerLog.innerText += "-"+e.key
		showSymbol(jutsus[keyState])
		ws.send(keyState)
		console.log(keyState)
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
	else console.log(x)
}
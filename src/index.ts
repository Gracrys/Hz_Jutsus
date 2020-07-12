import { technique, jutsus } from "./jutsus.ts"

const footerLog = document.querySelector("footer #logger")
let keyState = ""

document.body.addEventListener("keydown", e =>{

	footerLog.classList.add("is-logged")

	if((/Enter/i).test(e.key)){

		footerLog.innerText += "-"+e.key
		console.log(jutsus[keyState])
		keyState = ""
	}
	else{
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
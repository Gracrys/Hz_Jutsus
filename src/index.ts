
const footerLog = document.querySelector("footer #logger")


document.body.addEventListener("keydown", e =>{
	console.log(e.key)
	footerLog.classList.add("is-logged")
	footerLog.innerText = e.key
	console.log(footerLog.classList)
})

document.body.addEventListener("keyup", e =>{
	setTimeout(() => {
		footerLog.classList.remove("is-logged")
		footerLog.innerText = ""
	}, 2000  )
})
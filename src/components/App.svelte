<script lang="typescript">
	
	import {ip, check, sc} from '../store/index.ts'	
	import Modal from './Modal.svelte'
	// import game from '../game.ts'
	import { technique, jutsus } from "../jutsus.ts"


	let keyState = ""
	let showKeyState : string 


sc.on('game', (x) =>{
	// if(!x.error)
		check.set(false)	
		console.log(check)
	console.log(x.error, x)
	console.warn("connected")
})

	let game = (e) => {

	console.log(jutsus)
		if ( !$check){

			if((/Enter/i).test(e.key)){
				// showSymbol(jutsus[keyState])
				// ws.send(keyState)
				keyState = ""

			}	else if((/Backspace/i).test(e.key)){

				keyState = keyState.slice(0, -1)

			}	else if((/[a-z]/ig).test(e.key))  {
				keyState += e.key
			}
		}			
}


$: console.warn($check)

</script>

<style lang="scss">
 	
</style>
<svelte:body on:keydown={x => game(x)}/>
<template>
	<main class="c-main" >
		<figure class="js-symbol u-center"></figure>
		<figcaption class="js-symbol js-symbol_desc">
			<h1></h1>
			<h3>
				<blockquote></blockquote>
			</h3>
		</figcaption>
	</main>
	<footer>
			<dialog id="logger" class="js-log c-log" class:is-logged={keyState}>{keyState}</dialog>
	</footer>

{#if $check }
	<Modal />
{/if}
</template>
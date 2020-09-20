<script lang="typescript">
	
	import {ip, check, sc} from '../store/index.ts'	
	import Modal from './Modal.svelte'
	// import game from '../game.ts'
	import { technique, jutsus } from "../jutsus.ts"


	let keyState = ""
	let currentJutsu

sc.on('game', (x) =>{
	// if(!x.error)
		check.set(false)	
	console.warn("connected")
})

	console.log(jutsus)
	let game = (e) => {

		if ( !$check){

			if((/Enter/i).test(e.key)){
				currentJutsu = (jutsus[keyState])
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
		{#if !!currentJutsu}
			<figure class="js-symbol u-center">{currentJutsu?.symbol}</figure>
			<figcaption class="js-symbol js-symbol_desc">
				<h1>{currentJutsu?.kanji}</h1>
				<h3>
					<blockquote>{currentJutsu?.romanji}</blockquote>
				</h3>
			</figcaption>
		{/if}
	</main>
	<footer>
			<dialog id="logger" class="js-log c-log" class:is-logged={keyState}>{keyState}</dialog>
	</footer>

{#if $check }
	<Modal />
{/if}
</template>
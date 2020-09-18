<script lang="typescript">
	import { slide, fade } from 'svelte/transition';
	import postData from '../utils/postData.ts'	
	import {ip, check, sc} from '../store/index.ts'	
// import { get } from 'svelte/store';

	let data  = {
		room : "",
		name: ""
	} 

     sc.on( 'log', function( event ) {
      console.log( 'response:', event )
    });

function sendData(x) {
	// console.log($ws)

	// $ws.send(JSON.stringify(data))

	// console.log(get(ws))
	sc.emit('log',data)
	// sc.on('log', (x) =>{

	// 	check.set(false)	
	// 	console.warn("connected")
	// })
}




</script>

<style lang=scss>
	#modal{
		position: absolute;
		/*transition: bottom 5s;*/
		&.js-active{
			animation: slide 2s 1;
			bottom: 40vh;	
		}
		input[type=text]{
			background-image:  linear-gradient(from top,  #ffffff44 0%, #ffffff88 100%);
		}
	}

	@keyframes slide{
		from {
			bottom: -400px;
		}
		to {
			bottom: 40vh;	
		}
	}

	label{
		display: block ;
	}
	
</style>

{#if $check == true}
	<dialog id=modal transition:slide="{{delay: 1250, duration: 2200}}" class="js-modal c-modal" class:js-active={check}> 
		<h1>hENLO!</h1>
		{#if localStorage}
			<label>Pick a name</label><input type="" bind:value={data.name} name="">
		{/if}
		<p>Select a server</p>
		<input type="text" bind:value={data.room} name="room">
		<button on:click={sendData}>accept</button>
	</dialog>
{/if}


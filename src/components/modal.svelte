<script lang="typescript">
	import { slide, fade } from 'svelte/transition';
	import postData from '../utils/postData.ts'	
	import {ip, check, sc, lS} from '../store/index.ts'	
// import { get } from 'svelte/store';

	let data  = {
		room : "",
		name: ""
	} 

     sc.on( 'log', function( event ) {
      console.log( 'response:', event )
    });

function sendData(x) {

	sc.emit('log',data)
	localStorage.setItem('data', JSON.stringify(data));

	lS.set(data)
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

	<dialog id=modal transition:slide="{{delay: 250, duration: 2200}}" class="js-modal c-modal js-active"  > 
		<h1>hENLO!</h1>
		{#if !$lS?.name}
			<label>Pick a name</label><input type="" bind:value={data.name} name="">
		{/if}
		<p>Select a server</p>
		<input type="text" bind:value={data.room} name="room">
		<button on:click={sendData}>accept</button>
	</dialog>


<script lang="typescript">
	import { slide, fade } from 'svelte/transition';
	import {connect, ip, port} from 'store'
	import postData from '../utils/postData.ts'	
	export let check= false 

	const ws = connect

	interface Data {
		text : string,
		name : string
	}

	let data : Data = {
		text : "",
		name: ""
	} 

	$: console.log(check)

function sendData(x) {
	ws.send(JSON.stringify(data))
	postData('http://'+ip, {data: text})
		  .then(d => {
		    console.log(d); // JSON data parsed by `data.json()` call
		  }).catch( x => console.warn("error") )	

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
	{#if check == true}
		<dialog id=modal transition:slide="{{delay: 1250, duration: 2200}}" class="js-modal c-modal" class:js-active={check}> 
			<h1>hENLO!</h1>
			{#if localStorage}
				<label>Pick a name</label><input type="" bind:value={data.name} name="">
			{/if}
			<p>Select a server</p>
			<input type="text" bind:value={data.text}>
			<button on:click={sendData}>accept</button>
		</dialog>
	{/if}


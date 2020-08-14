<script lang="typescript">
	import { slide, fade } from 'svelte/transition';	
	export let check= false 
	$: console.log(check)

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
	
</style>
	{#if check == true}
		<dialog id=modal transition:slide="{{delay: 1250, duration: 2200}}" class="js-modal c-modal" class:js-active={check}> 
			<h1>hENLO!</h1>
			<p>Select a server</p>
			<input type="text">
			<button>accept</button>
		</dialog>
	{/if}


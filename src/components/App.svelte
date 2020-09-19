<script lang="typescript">
	
	import {ip, check, sc} from '../store/index.ts'	
	import Modal from './Modal.svelte'
</script>

<style lang="scss">
 	
</style>

<template>
	<main class="c-main" on:>
		<figure class="js-symbol u-center"></figure>
		<figcaption class="js-symbol js-symbol_desc">
			<h1></h1>
			<h3>
				<blockquote></blockquote>
			</h3>
		</figcaption>
	</main>
	<footer>
		<dialog id="logger" class="js-log c-log"></dialog>
	</footer>

{#if $check == true}
	<Modal />
{/if}
</template>
<script lang="typescript">
	
	import {ip, check, sc} from '../store/index.ts'	
	import modal from './modal'
</script>

<style lang="scss">
 	
</style>

<template>
	<main class="c-main">
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
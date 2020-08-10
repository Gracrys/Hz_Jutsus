<script lang="ts">
	
	export let check:boolean= true 
	$: console.log(check)

</script>

<style></style>

<template >
	{#if check == true}
		<dialog id=modal class="js-modal c-modal" />
	{/if}
</template>


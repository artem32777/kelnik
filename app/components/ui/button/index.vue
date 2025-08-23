<script setup lang="ts">
const {
	type = 'button',
} = defineProps<{
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
}>()
</script>

<template>
	<button
		:type
		:disabled
		class="button"
	>
		<slot />
	</button>
</template>

<style scoped lang="scss">
.button {
  padding: 8px 24px;
  border: 1px solid var(--grey-3);
  border-radius: 25px;
  transition: all 0.3s ease 0s;
  @media (any-hover: hover){
    &:not(:disabled):hover{
        color: var(--green-1);
     }
  }
  &:not(:disabled):active{
    color: var(--green-1);
    background-color: var(--green-4);
  }
  &:disabled{
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>

<script setup lang="ts">
const isVisible = ref(false)
const canScroll = ref(false)

const update = () => {
	const doc = document.documentElement
	const scrollable = doc.scrollHeight - window.innerHeight
	canScroll.value = scrollable > 0
	isVisible.value = canScroll.value && window.scrollY > 200
}

const onClick = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
	update()
	window.addEventListener('scroll', update, { passive: true })
	window.addEventListener('resize', update)
})
onBeforeUnmount(() => {
	window.removeEventListener('scroll', update)
	window.removeEventListener('resize', update)
})
</script>

<template>
	<button
		class="scroll-top"
		:class="{ 'scroll-top_visible': isVisible }"
		aria-label="Наверх"
		title="Наверх"
		type="button"
		@click="onClick"
	>
		<Icon name="icon:arrow-up" />
	</button>
</template>

<style scoped lang="scss">
.scroll-top {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--green-2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease 0s;
  z-index: 30;
  opacity: 0;
  transform: translate(10px, 0px);

  &_visible {
    opacity: 1;
    transform: translate(0px, 0px);
  }

  &:hover {
    box-shadow: 1px 1px 10px var(--green-3);
  }

  &:active {
    transform: translateY(1px);
  }
}
</style>

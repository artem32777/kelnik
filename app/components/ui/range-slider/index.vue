<script setup lang="ts">
import VueSlider from 'vue-3-slider-component'
import type { ExtractPropTypes } from 'vue'

type Props = InstanceType<typeof VueSlider.props>
type Props = ExtractPropTypes<typeof VueSlider.props>

const props = defineProps<Props>()
const model = defineModel<Model>()
</script>

<template>
	<VueSlider
		v-model="model"
		v-bind="props"
	/>
</template>

<style scoped lang="scss">
:deep(.vue-slider-dot-handle),
:deep(.vue-slider-process) {
  background-color: var(--green-1);
  box-shadow: none;
}
</style>

<script setup lang="ts">
import VueSlider from 'vue-3-slider-component'
import type { MinMaxRange } from '~/types/common/Range'

defineProps<{
	min?: number
	max?: number
	label?: string
}>()

const model = defineModel<MinMaxRange>({ required: true, default: [0, 100] })
</script>

<template>
	<div class="filter-range">
		<span class="filter-range__label">
			{{ label }}
		</span>
		<div class="filter-range__values">
			<div class="filter-range__value-label">
				от <span class="filter-range__value">{{ model[0].toLocaleString('ru-RU') }}</span>
			</div>
			<div class="filter-range__value-label">
				до <span class="filter-range__value">{{ model[1].toLocaleString('ru-RU') }}</span>
			</div>
		</div>
		<div class="filter-range__slider">
			<VueSlider
				v-model="model"
				:max="max || 100"
				:min="min || 0"
				title="Фильтрация"
				aria-label="Фильтрация"
				tooltip="none"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
:deep(.vue-slider-dot-handle),
:deep(.vue-slider-process) {
  background-color: var(--green-1);
  box-shadow: none;
}

.filter-range {
  cursor: pointer;
  @media (max-width:$lg2){
    font-size: 14px;
  }
  &__label {
    font-size: 14px;
    margin-bottom: 16px;
  }

  &__slider{
    height: 18px;
  }

  &__values {
    display: flex;
    @media (min-width:$lg2){
      margin-bottom: 6px;
    }
  }

  &__value-label {
    font-weight: 400;
    color: var(--grey-1);
    display: flex;
    gap: 8px;
    &:first-child{
      min-width: 160px;
      @media (max-width:$lg2){
        min-width: 140px;
      }
    }
  }

  &__value {
    font-weight: 500;
    color: var(--main-black);
  }
}
</style>

<script setup lang="ts">
const store = useApartmentsTableStore()
const { resetFilter } = store
const { filter, filterRanges, pending } = storeToRefs(store)

const isResetButtonDisabled = computed(() => {
	if (filter.value?.rooms.length) {
		return false
	}

	const isPriceDefault = filter.value?.price && filterRanges.value?.price
		? filter.value.price[0] === filterRanges.value.price[0]
		&& filter.value.price[1] === filterRanges.value.price[1]
		: true

	const isAreaDefault = filter.value?.area && filterRanges.value?.area
		? filter.value.area[0] === filterRanges.value.area[0]
		&& filter.value.area[1] === filterRanges.value.area[1]
		: true

	return isPriceDefault && isAreaDefault
})
</script>

<template>
	<section
		v-if="filter && filterRanges"
		class="filter"
		:class="{ filter_pending: pending }"
	>
		<FilterRooms
			v-model="filter.rooms"
			class="filter__rooms"
		/>
		<FilterRange
			v-model="filter.price"
			:min="filterRanges.price[0]"
			:max="filterRanges.price[1]"
			label="Стоимость квартиры, ₽"
		/>

		<FilterRange
			v-model="filter.area"
			:min="filterRanges.area[0]"
			:max="filterRanges.area[1]"
			label="Площадь, м²"
		/>
		<button
			:disabled="isResetButtonDisabled"
			type="reset"
			class="filter__reset"
			@click="resetFilter"
		>
			Сбросить параметры
			<Icon
				class="filter__reset-icon"
				name="icon:cross"
			/>
		</button>
	</section>
</template>

<style scoped lang="scss">
.filter{
  display: flex;
  flex-direction: column;
  gap: 27px;
  flex: 0 0 399px;
  height: 372px;
  padding: 40px;
  border-radius: 10px;
  background-color: var(--green-4);
  @media (max-width:$lg2){
    padding: 20px 19px;
    flex: 0 0 318px;
    width: 318px;
    height: 318px;
  }
  &_pending{
    pointer-events: none;
  }

  &__reset{
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: start;
    padding: 5px 16px 7px;
    transition: all 0.3s ease 0s;
    @media (any-hover: hover){
      &:not(:disabled):hover {
        color: var(--hover-alert);
      }
    }
    &:not(:disabled):active {
      color: var(--active-alert);
    }
    &:disabled {
      opacity: 0;
      pointer-events: none;
    }
  }
  &__reset-icon{
    width: 8px;
    height: 8px;
  }
}
</style>

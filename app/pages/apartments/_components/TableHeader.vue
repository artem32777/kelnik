<script setup lang="ts">
import type { SortingDirection, TableColumn } from '~/types/common/Table'

const store = useApartmentsTableStore()
const { pending, sorting } = storeToRefs(store)

const columns: TableColumn[] = [
	{ label: 'Планировка' },
	{ label: 'Квартира' },
	{ label: 'S, м²', sortKey: 'area' },
	{ label: 'Этаж', sortKey: 'floor' },
	{ label: 'Цена, ₽', sortKey: 'price' },
]

const setSort = (col: string, dir: SortingDirection) => {
	sorting.value = sorting.value?.column === col && sorting.value?.direction === dir
		? null
		: { column: col, direction: dir }
}
</script>

<template>
	<header class="table-header">
		<div
			v-for="col in columns"
			:key="col.label"
			class="table-header__column"
			:class="{ table__th_active: col.sortKey && sorting?.column === col.sortKey }"
		>
			{{ col.label }}
			<UiButtonSort
				v-if="col.sortKey"
				:pending
				:direction="sorting?.column === col.sortKey ? sorting?.direction : null"
				@sort="dir => setSort(col.sortKey!, dir)"
			/>
		</div>
	</header>
</template>

<style scoped lang="scss">
.table-header{
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 80px 1fr 120px 120px 120px;
  gap: 20px;
  width: 100%;
  border-bottom: 1px solid var(--grey-4);
  @media (max-width: $lg2) {
    padding-bottom: 16px;
    border-bottom: none;
    grid-template-columns: 45px 48px 64px;
  }
  &__column {
    font-size: 14px;
    display: flex;
    gap: 8px;
    align-items: center;
    white-space: nowrap;

    &_active {
      @include transition-weight-grow();
      color: var(--green-1);
    }

    &:nth-child(1), &:nth-child(2) {
      @media (max-width: $lg2) {
        display: none;
      }
    }

  }
}
</style>

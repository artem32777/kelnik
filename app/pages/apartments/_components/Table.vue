<script setup lang="ts">
import type { SortingDirection, TableProps } from '~/types/common/Table'

const store = useApartmentsTableStore()
const { fetchMoreItems } = store
const { canFetchMoreItems, pending, items, sorting } = storeToRefs(store)

const columns: TableProps['columns'] = [
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
	<div>
		<div class="table">
			<header class="table__header">
				<div
					v-for="col in columns"
					:key="col.label"
					class="table__th"
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
			<main class="table__main">
				<article
					v-for="item in items"
					:key="item.id"
					class="table__item"
				>
					<div class="table__main-names">
						<div class="table__td">
							<NuxtImg
								:src="item.image"
								alt="apartment preview"
							/>
						</div>
						<div class="table__td">
							{{ `${item.rooms}-комнатная №${item.id}` }}
						</div>
					</div>
					<div class="table__main-properties">
						<div class="table__td">
							{{ item.area }}
							<span class="table__area-label">м²</span>
						</div>
						<div class="table__td">
							{{ item.floor }}
							<span class="table__floors-label"> из {{ item.floorsTotal }}</span>
						</div>
						<div class="table__td">
							{{ item.price.toLocaleString('ru-RU') }}
							<span class="table__price-label">₽</span>
						</div>
					</div>
				</article>
			</main>
		</div>

		<span
			v-if="!items.length"
			class="table__empty"
		>
			Нет доступных квартир. Измените настройки фильтра.
		</span>

		<UiButton
			v-show="canFetchMoreItems && !pending"
			class="table__load-more"
			@click="fetchMoreItems"
		>
			Загрузить ещё
		</UiButton>
	</div>
</template>

<style scoped lang="scss">
.table {
  &__header {
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
  }

  &__th {
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

  &__main{
    @media (max-width:$lg2){
      display: grid;
      gap: 4px;
    }
  }

  &__item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    padding: 20px 0 25px 6px;
    height: 121px;
    border-bottom: 1px solid var(--grey-4);
    position: relative;

    @media (max-width: $lg2) {
      padding: 16px 0 0 24px;
      border: 1px solid var(--grey-4);
      border-radius: 8px;
      gap: 0px;
      height: 112px;
      display: block;
    }
  }

  &__main-names {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 20px;
    @media (max-width: $lg2) {
      grid-template-columns: 0 1fr;
      gap: 0;
      margin-bottom: 22px;
    }

    .table__td {
      &:nth-child(1) {
        padding-top: 4px;

        img {
          min-width: 66px;
          min-height: 63px;
        }

        @media (max-width: $lg2) {
          img {
            position: absolute;
            right: 28px;
          }
        }
      }

      &:nth-child(2) {
        white-space: nowrap;
        font-weight: 500;
        @media (max-width:$lg2){
          font-size: 14px;
        }
      }
    }
  }

  &__main-properties {
    display: inline-grid;
    grid-template-columns: 120px 120px 120px;
    gap: 20px;
    @media (max-width: $lg2) {
      align-self: start;
      grid-template-columns: auto auto auto;
    }
  }

  &__floors-label {
    color: var(--grey-1);
  }

  &__area-label {
    @media (min-width: $lg2) {
      display: none;
    }
  }

  &__price-label {
    @media (min-width: $lg2) {
      display: none;
    }
  }

  &__empty {
    padding-top: 40px;
    text-align: center;
    font-size: 20px;
  }

  &__load-more {
    margin-top: 48px;
    @media (max-width: $lg2) {
      margin-top: 24px;
    }
  }
}
</style>

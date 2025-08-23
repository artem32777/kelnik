<script setup lang="ts">
const store = useApartmentsTableStore()
const { fetchMoreItems } = store
const { canFetchMoreItems, pending, items } = storeToRefs(store)
</script>

<template>
	<div>
		<div class="table">
			<TableHeader />
			<main class="table__content">
				<article
					v-for="item in items"
					:key="item.id"
					class="table__item"
				>
					<div class="table__item-main">
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
					<div class="table__item-properties">
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

		<div
			v-if="!items.length"
			class="table__empty"
		>
			Нет доступных квартир. Измените настройки фильтра.
		</div>

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
  &__content{
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
      gap: 0;
      height: 112px;
      display: block;
    }
  }

  &__item-main {
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

  &__item-properties {
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

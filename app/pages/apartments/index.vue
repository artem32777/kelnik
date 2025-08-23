<script setup lang="ts">
const store = useApartmentsTableStore()
const { filter, sorting } = storeToRefs(store)
const { baseFetch } = store

useSeoMeta({
	title: 'Квартиры',
	ogTitle: 'Квартиры',
	description: 'Доступные к продаже квартиры',
	ogDescription: 'Доступные к продаже квартиры',
	ogImage: '/apartment.svg',
	twitterCard: 'summary_large_image',
})

useAsyncData('apartments', () => baseFetch())

watch(
	[filter, sorting],
	debounce(() => baseFetch(), 300), { deep: true },
)
</script>

<template>
	<div class="page">
		<section class="page__section">
			<h1 class="h1 page__title">
				Квартиры
			</h1>
			<Table class="page__table" />
		</section>
		<Filter class="page__filter" />
	</div>
</template>

<style scoped lang="scss">
.page{
  display: flex;
  justify-content: space-between;
  gap: 80px;
  @media (max-width:$lg2){
    gap: 28px;
  }
  &__section{
    flex: 1 1 801px;
  }
  &__title{
    margin-bottom: 48px;
    @media (max-width:$lg2){
      margin-bottom: 34px;
    }
  }
}
</style>

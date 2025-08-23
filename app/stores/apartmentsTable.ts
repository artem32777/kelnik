import type { Apartment, ApartmentsFilter, ApartmentsResponse } from '~/types/Apartment'
import type { TableSorting } from '~/types/common/Table'

export const useApartmentsTableStore = defineStore('apartmentsTable', () => {
	const items = ref<Apartment[]>([])
	const totalItems = ref(0)
	const pageOffset = ref(0)

	const sorting = ref<TableSorting | null>(null)
	const filter = ref<ApartmentsFilter>()
	const filterRanges = ref<ApartmentsFilter>()

	const pending = ref(false)

	async function fetchMoreItems() {
		if (pageOffset.value === 0) {
			pageOffset.value = items.value.length
		}
		const res = await baseFetch(pageOffset.value, 10)
		pageOffset.value += res.items.length
	}

	function resetFilter() {
		if (!filterRanges.value) return
		filter.value = {
			rooms: [],
			price: [...filterRanges.value.price],
			area: [...filterRanges.value.area],
		}
	}

	async function baseFetch(offset = 0, limit = pageOffset.value) {
		pending.value = true
		try {
			const res = await $fetch<ApartmentsResponse>('/api/apartments', {
				query: { offset: offset, limit: limit, ...filter.value, ...sorting.value },
			})
			totalItems.value = res.total
			filterRanges.value = res.filterRanges
			if (offset === 0) {
				items.value = res.items
			} else {
				items.value.push(...res.items)
			}
			if (!filter.value) resetFilter()
			return res
		} catch (e) {
			console.warn(e) // TODO: toast
			throw e
		} finally {
			pending.value = false
		}
	}

	return {
		baseFetch,
		items,
		totalItems,
		canFetchMoreItems: computed(() => items.value.length < totalItems.value),
		fetchMoreItems,
		sorting,
		filter,
		filterRanges,
		resetFilter,
		pending,
	}
}, {
	persist: [
		{
			pick: ['filter', 'sorting'],
			storage: piniaPluginPersistedstate.cookies(),
		},
	],
})

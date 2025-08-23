import type { Apartment, ApartmentRequest, ApartmentsResponse } from '~/types/Apartment'
import json from '~~/server/data/apartments.json'

// имитация бекенда, без валидации
export default defineEventHandler((event): ApartmentsResponse => {
	const initialData: Apartment[] = json
	let data = [...initialData]
	const query: ApartmentRequest = getQuery(event)
	const limit = Number(query.limit) || 10
	const offset = Number(query.offset) || 0

	const ranges = getMinMaxRanges(data, ['price', 'area'])
	const allRooms = [...new Set(data.map(el => el.rooms))]

	if (query.rooms) {
		const roomsFilter = (Array.isArray(query.rooms) ? query.rooms : [query.rooms])
			.map(Number)
		data = initialData.filter(apartment => roomsFilter.includes(apartment.rooms))
	}

	if (query.price) {
		const [priceMin, priceMax] = query.price
		data = data.filter(apartment => apartment.price >= priceMin && apartment.price <= priceMax)
	}

	if (query.area) {
		const [areaMin, areaMax] = query.area
		data = data.filter(apartment => apartment.area >= areaMin && apartment.area <= areaMax)
	}

	if (query.column && query.direction) {
		data = sortTableData(data, query.column as keyof Apartment, query.direction)
	}

	return {
		items: data.slice(offset, offset + limit),
		total: data.length,
		filterRanges: {
			rooms: allRooms,
			price: [...ranges.price],
			area: [...ranges.area],
		},
	}
})

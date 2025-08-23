import type { PaginationBaseRequest, PaginationResponse } from '~/types/common/Pagination'
import type { MinMaxRange } from '~/types/common/Range'
import type { TableSorting } from '~/types/common/Table'

export type Apartment = {
	id: number
	price: number
	area: number
	rooms: number
	floor: number
	floorsTotal: number
	image: string
}

export type ApartmentsFilter = {
	rooms: number[]
	price: MinMaxRange
	area: MinMaxRange
}

export type ApartmentsResponse = PaginationResponse<Apartment> & {
	filterRanges: ApartmentsFilter
}

export type ApartmentRequest = Partial<PaginationBaseRequest & TableSorting & ApartmentsFilter>

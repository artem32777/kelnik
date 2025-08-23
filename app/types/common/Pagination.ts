export interface PaginationResponse<T> {
	items: T[]
	total: number
}

export interface PaginationBaseRequest {
	limit: number
	offset: number
}

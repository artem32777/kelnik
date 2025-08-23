export interface TableColumn {
	label: string
	sortKey?: string
}

export type TableSorting = {
	column: string
	direction: SortingDirection
}

export type SortingDirection = 'asc' | 'desc'

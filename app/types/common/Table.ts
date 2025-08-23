export interface TableProps {
	items: Record<string, any>[]
	columns: {
		label: string
		sortKey?: string
	}[]
	pending?: boolean
}

export type TableSorting = {
	column: string
	direction: SortingDirection
}

export type SortingDirection = 'asc' | 'desc'

import type { SortingDirection } from '~/types/common/Table'

export function sortTableData<T>(
	data: T[],
	column: keyof T,
	direction: SortingDirection,
): T[] {
	const sortedData = [...data]

	sortedData.sort((a, b) => {
		let valueA: any = a[column]
		let valueB: any = b[column]

		if (valueA == null) valueA = direction === 'asc' ? Infinity : -Infinity
		if (valueB == null) valueB = direction === 'asc' ? Infinity : -Infinity

		if (typeof valueA === 'string' && !isNaN(Number(valueA)) && valueA !== '') {
			valueA = Number(valueA)
		}
		if (typeof valueB === 'string' && !isNaN(Number(valueB)) && valueB !== '') {
			valueB = Number(valueB)
		}

		if (valueA < valueB) {
			return direction === 'asc' ? -1 : 1
		}
		if (valueA > valueB) {
			return direction === 'asc' ? 1 : -1
		}
		return 0
	})

	return sortedData
}

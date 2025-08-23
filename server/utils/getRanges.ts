import type { MinMaxRange } from '~/types/common/Range'

type NumericKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T]

export function getMinMaxRanges<T, K extends NumericKeys<T>>(data: T[], keys: K[]) {
	const result = {} as { [P in K]: MinMaxRange }

	for (const key of keys) {
		let min = Infinity
		let max = -Infinity

		for (const item of data) {
			const value = item[key]
			if (typeof value === 'number') {
				if (value < min) min = value
				if (value > max) max = value
			}
		}

		result[key] = [min, max]
	}

	return result
}

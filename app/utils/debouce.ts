export function debounce<F extends (...args: any[]) => any>(
	fn: F,
	delay: number,
): (...args: Parameters<F>) => Promise<ReturnType<F>> {
	let timer: ReturnType<typeof setTimeout>
	return (...args: Parameters<F>) => {
		return new Promise<ReturnType<F>>((resolve) => {
			clearTimeout(timer)
			timer = setTimeout(() => {
				resolve(fn(...args))
			}, delay)
		})
	}
}

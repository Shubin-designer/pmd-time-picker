export const getScrollBarWidth = (): number => {
	const scrollDiv = document.createElement('div')
	scrollDiv.className = 'react-timekeeper-scrollbar-measure'
	document.body.appendChild(scrollDiv)
	const width = scrollDiv.offsetWidth - scrollDiv.clientWidth
	document.body.removeChild(scrollDiv)
	return width
}

export type CalcOffsetFn = (x: number, y: number) => { offsetX: number; offsetY: number }

export const calcOffset = (el: HTMLDivElement): CalcOffsetFn => {
	const style = window.getComputedStyle(el)
	const borderLeft = parseInt(style.borderLeftWidth || '0', 10)
	const borderTop = parseInt(style.borderTopWidth || '0', 10)
	const rect = el.getBoundingClientRect()

	return (clientX: number, clientY: number) => ({
		offsetX: clientX - borderLeft - rect.left,
		offsetY: clientY - borderTop - rect.top,
	})
}

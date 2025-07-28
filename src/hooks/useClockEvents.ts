import { useEffect, useRef, useCallback } from 'react'

import { CLOCK_RADIUS, INNER_NUMBER_RADIUS } from '../helpers/constants'
import { calcOffset, CalcOffsetFn } from '../helpers/dom'
import { deg, isWithinRadius } from '../helpers/math'
import { ElementRef } from '../helpers/types'

const { atan2 } = Math

type CalcTimeFromAngle = (
	angle: number,
	opts: {
		canAutoChangeMode: boolean
		wasTapped: boolean
		isInnerClick: boolean
	},
) => void

export default function useClockEvents(
	clock: ElementRef,
	handleChange: CalcTimeFromAngle,
) {
	const wrapper = useRef<HTMLDivElement | null>(null)
	const calcOffsetCache = useRef<CalcOffsetFn | null>(null)
	const dragCount = useRef(0)
	const cleanupRef = useRef<() => void>(() => {})
	const handleChangeRef = useRef(handleChange)

	useEffect(() => {
		handleChangeRef.current = handleChange
	}, [handleChange])

	const calculatePoint = useCallback((offsetX: number, offsetY: number, canAutoChangeMode: boolean) => {
		const wasTapped = dragCount.current < 2
		const x = offsetX - CLOCK_RADIUS
		const y = -offsetY + CLOCK_RADIUS
		const a = atan2(y, x)
		let d = 90 - deg(a)
		if (d < 0) d += 360
		if (!isWithinRadius(x, y, CLOCK_RADIUS) && wasTapped) return false
		const isInnerClick = isWithinRadius(x, y, INNER_NUMBER_RADIUS)
		handleChangeRef.current(d, { canAutoChangeMode, wasTapped, isInnerClick })
	}, [])

	const handleMouseUp = useCallback((e: MouseEvent) => {
		if (!clock.current) return
		clock.current.style.cursor = ''
		const { offsetX, offsetY } = calcOffsetCache.current!(e.clientX, e.clientY)
		calculatePoint(offsetX, offsetY, true)
	}, [calculatePoint, clock])

	const handleTouchEnd = useCallback((e: TouchEvent) => {
		const touch = e.targetTouches[0] || e.changedTouches[0]
		if (touch && calcOffsetCache.current) {
			const { offsetX, offsetY } = calcOffsetCache.current(touch.clientX, touch.clientY)
			calculatePoint(offsetX, offsetY, true)
		}
	}, [calculatePoint])

	const handleMouseDrag = useCallback((e: MouseEvent) => {
		if (calcOffsetCache.current) {
			const { offsetX, offsetY } = calcOffsetCache.current(e.clientX, e.clientY)
			calculatePoint(offsetX, offsetY, false)
		}
		dragCount.current++
		if (dragCount.current === 1 && clock.current) {
			clock.current.style.cursor = 'grabbing'
		}
		e.preventDefault()
	}, [calculatePoint, clock])

	const handleTouchDrag = useCallback((e: TouchEvent) => {
		if (calcOffsetCache.current) {
			const touch = e.targetTouches[0]
			const { offsetX, offsetY } = calcOffsetCache.current(touch.clientX, touch.clientY)
			calculatePoint(offsetX, offsetY, false)
		}
		dragCount.current++
		e.preventDefault()
	}, [calculatePoint])

	const handleStopDrag = useCallback((e: MouseEvent | TouchEvent) => {
		cleanupRef.current()
		if (!e || !clock.current) return
		if (e.type === 'mouseup') handleMouseUp(e as MouseEvent)
		if (e.type === 'touchend' || e.type === 'touchcancel') handleTouchEnd(e as TouchEvent)
	}, [handleMouseUp, handleTouchEnd, clock])

	const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
		dragCount.current = 0
		if (clock.current) {
			calcOffsetCache.current = calcOffset(clock.current)
			const { offsetX, offsetY } = calcOffsetCache.current(e.clientX, e.clientY)
			const x = offsetX - CLOCK_RADIUS
			const y = offsetY - CLOCK_RADIUS
			if (!isWithinRadius(x, y, CLOCK_RADIUS)) return
		}
		document.addEventListener('mousemove', handleMouseDrag, false)
		document.addEventListener('mouseup', handleStopDrag, false)
		wrapper.current?.addEventListener('mouseleave', handleStopDrag, false)
		// @ts-ignore
		handleMouseDrag(e)
	}, [clock, handleMouseDrag, handleStopDrag])

	const handleTouchStart = useCallback((e: TouchEvent) => {
		e.preventDefault()
		dragCount.current = 0
		document.addEventListener('touchmove', handleTouchDrag, false)
		document.addEventListener('touchend', handleStopDrag, false)
		document.addEventListener('touchcancel', handleStopDrag, false)
		if (clock.current) {
			calcOffsetCache.current = calcOffset(clock.current)
		}
	}, [clock, handleStopDrag, handleTouchDrag])

	useEffect(() => {
		const el = clock.current
		if (el) {
			el.addEventListener('touchstart', handleTouchStart, false)
		}
		return () => {
			if (el) {
				el.removeEventListener('touchstart', handleTouchStart, false)
			}
		}
	}, [clock, handleTouchStart])

	useEffect(() => {
		cleanupRef.current = () => {
			document.removeEventListener('mousemove', handleMouseDrag, false)
			document.removeEventListener('mouseup', handleStopDrag, false)
			wrapper.current?.removeEventListener('mouseleave', handleStopDrag, false)
			document.removeEventListener('touchmove', handleTouchDrag, false)
			document.removeEventListener('touchend', handleStopDrag, false)
			document.removeEventListener('touchcancel', handleStopDrag, false)
		}
	}, [handleMouseDrag, handleStopDrag, handleTouchDrag])

	useEffect(() => cleanupRef.current, [])

	return {
		bind: {
			onMouseDown: handleMouseDown,
			ref: wrapper,
		},
	}
}

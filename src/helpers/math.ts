import {
	VISIBLE_NUMBERS_PER_CIRCLE,
	CLOCK_RADIUS,
	NUMBER_RADIUS_REGULAR,
} from './constants'

const { cos, sin, sqrt, PI } = Math
const ANGLE_PER_INCREMENT = 360 / VISIBLE_NUMBERS_PER_CIRCLE

export const rad = (deg: number): number => deg * (PI / 180)
export const deg = (rad: number): number => rad * (180 / PI)

const translateX = (index: number, transform: number): number =>
	sin(rad(index * -ANGLE_PER_INCREMENT - 180)) * (CLOCK_RADIUS - transform) +
	CLOCK_RADIUS - NUMBER_RADIUS_REGULAR / 2

const translateY = (index: number, transform: number): number =>
	cos(rad(index * -ANGLE_PER_INCREMENT - 180)) * (CLOCK_RADIUS - transform) +
	CLOCK_RADIUS - NUMBER_RADIUS_REGULAR / 2

export const transform = (index: number, t: number): string => {
	const x = translateX(index, t)
	const y = translateY(index, t)
	return `translate(${x}px, ${y}px)`
}

export const isWithinRadius = (x: number, y: number, radius: number): boolean =>
	sqrt(x * x + y * y) < radius

const normalize = (angle: number): number => ((angle % 360) + 360) % 360

export const calcAnimationAngle = (prev: number, next: number): number => {
	const p = normalize(prev)
	const n = normalize(next)

	let lower = p
	let upper = p

	while (n < lower) lower -= 360
	while (n >= upper) upper += 360

	return upper - n < n - lower ? prev - (upper - n) : prev + (n - lower)
}

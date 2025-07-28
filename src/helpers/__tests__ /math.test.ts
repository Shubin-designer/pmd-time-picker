import { calcAnimationAngle } from '../math'

type TestCase = {
	prev: number
	next: number
	expected: number
	description?: string
}

describe('math/calcAnimationAngle', () => {
	const testCases: TestCase[] = [
		{ prev: 30, next: 330, expected: -30 },
		{ prev: 330, next: 240, expected: 240 },
		{ prev: 330, next: 90, expected: 450 },
		{ prev: 240, next: 340, expected: 340 },
		{ prev: 90, next: 150, expected: 150 },
		{ prev: 0, next: 150, expected: 150 },
		{ prev: 330, next: 120, expected: 480 },
		{ prev: 390, next: 60, expected: 420 },
		{ prev: 390, next: 240, expected: 240 },
		{ prev: 60, next: -60, expected: -60 },
		{ prev: -60, next: 60, expected: 60 },
		{ prev: -60, next: 240, expected: -120 },
		{ prev: 240, next: 50, expected: 410 },
		{ prev: 240, next: 330, expected: 330 },
		{ prev: -120, next: 330, expected: -30 },
		{ prev: -390, next: 30, expected: -330 },
		{ prev: 0, next: 0, expected: 0 },
		{ prev: 0, next: 360, expected: 0 },
		{ prev: 360, next: 360, expected: 360 },
	]

	testCases.forEach(({ prev, next, expected, description }, i) => {
		const label = description || `case ${i + 1}: ${prev} -> ${next} = ${expected}`
		test(label, () => {
			const result = calcAnimationAngle(prev, next)

			// Validate correctness of returned result
			expect(result).toBe(expected)

			// Validate shortest path rule
			const delta = Math.abs(result - prev)
			expect(delta).toBeLessThanOrEqual(180)
		})
	})
})

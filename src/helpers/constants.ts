export const MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map(String)
export const MINUTES_60 = Array.from({ length: 60 }, (_, i) => i.toString())
export const HOURS_12 = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
export const HOURS_24 = Array.from({ length: 23 }, (_, i) => (i + 1).toString()).concat('00')

export enum MODE {
	MINUTES = 'MINUTES',
	HOURS_12 = 'HOURS_12',
	HOURS_24 = 'HOURS_24',
}

export enum MERIDIEM {
	am = 'am',
	pm = 'pm',
}

type ClockValues = {
	[mode in MODE]: {
		increments: number
		numbers: string[]
		dropdown: string[]
		numbersInner?: string[]
	}
}

export const CLOCK_VALUES: ClockValues = {
	[MODE.MINUTES]: {
		increments: 60,
		numbers: MINUTES,
		dropdown: MINUTES_60,
	},
	[MODE.HOURS_12]: {
		increments: 12,
		numbers: HOURS_12,
		dropdown: HOURS_12,
	},
	[MODE.HOURS_24]: {
		increments: 12,
		numbers: HOURS_24.slice(12),
		numbersInner: HOURS_24.slice(0, 12),
		dropdown: HOURS_24,
	},
}

export const VISIBLE_NUMBERS_PER_CIRCLE = 12
export const CLOCK_RADIUS = 110
export const CLOCK_SIZE = CLOCK_RADIUS * 2
export const INNER_NUMBER_RADIUS = 77

export const NUMBER_REGULAR_FONT_SIZE = 16
export const HOUR_24_INNER_FONT_SIZE = 15
export const HOUR_24_OUTER_FONT_SIZE = 13

export const NUMBER_RADIUS_REGULAR = 34
const NUMBER_RADIUS_HOUR_24_OUTER = 32
const NUMBER_RADIUS_HOUR_24_INNER = 28

export const NUMBER_OUTER_POSITION = 22
const NUMBER_OUTER_POSITION_24_HOUR = 18
const NUMBER_INNER_POSITION_24_HOUR =
	CLOCK_RADIUS - INNER_NUMBER_RADIUS + NUMBER_RADIUS_HOUR_24_INNER / 2

export const getOuterNumberPosition = (mode: MODE): number =>
	mode === MODE.HOURS_24 ? NUMBER_OUTER_POSITION_24_HOUR : NUMBER_OUTER_POSITION

export const INITIAL_HOUR_TRANSFORM = NUMBER_OUTER_POSITION - 32
export const INITIAL_MINUTE_TRANSFORM = NUMBER_OUTER_POSITION + 28

export const getClockHandLength = (mode: MODE, inner: boolean): number =>
	mode !== MODE.HOURS_24
		? NUMBER_OUTER_POSITION
		: inner
		? NUMBER_INNER_POSITION_24_HOUR
		: NUMBER_OUTER_POSITION_24_HOUR

export const getClockHandCirclePosition = getClockHandLength

export const getClockHandCircleRadius = (mode: MODE, inner: boolean): number =>
	mode !== MODE.HOURS_24
		? NUMBER_RADIUS_REGULAR / 2
		: inner
		? NUMBER_RADIUS_HOUR_24_INNER / 2
		: NUMBER_RADIUS_HOUR_24_OUTER / 2

const animationChange = 22
export const INNER_NUMBER_POSITIONING = {
	exit: NUMBER_INNER_POSITION_24_HOUR + animationChange,
	enter: NUMBER_INNER_POSITION_24_HOUR,
}

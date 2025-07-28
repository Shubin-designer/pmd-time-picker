import { MODE } from './constants'
import { Time } from './types'

const modeToUnit = (mode: MODE): 'hour' | 'minute' =>
	mode === MODE.MINUTES ? 'minute' : 'hour'

export const getTimeValue = (mode: MODE, time: Time): number => {
	const unit = modeToUnit(mode)
	return time[unit]
}

export const getNormalizedTimeValue = (mode: MODE, time: Time): number => {
	const val = getTimeValue(mode, time)
	return mode === MODE.HOURS_12 ? val % 12 : val
}

export const isHourMode = (mode: MODE): boolean =>
	mode === MODE.HOURS_12 || mode === MODE.HOURS_24

export const isMinuteMode = (mode: MODE): boolean =>
	mode === MODE.MINUTES

export const isSameTime = (prev: Time, next: Time): boolean =>
	prev.hour === next.hour && prev.minute === next.minute

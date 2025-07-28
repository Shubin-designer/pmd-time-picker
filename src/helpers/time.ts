import DisabledTimeRange from './disable-time'
import { Time, TimeInput, TimeOutput } from './types'

const TIME_PARSE_MERIDIEM = /^\d{1,2}:\d{2}\s?(am|pm)$/i
const TIME_PARSE_24 = /^\d{1,2}:\d{2}$/

const defaultTime: Time = { hour: 12, minute: 30 }

export function parseTime(time?: TimeInput): Time {
	if (time == null) return defaultTime

	let hour = 0
	let minute = 0
	let meridiem: string | null = null

	if (typeof time === 'string') {
		let match = time.match(TIME_PARSE_MERIDIEM)
		if (match) {
			const parts = time.match(/(\d{1,2}):(\d{2})/)
			if (!parts) throw new Error('Invalid time format')
			hour = parseInt(parts[1], 10)
			minute = parseInt(parts[2], 10)
			meridiem = match[1].toLowerCase()
		} else {
			match = time.match(TIME_PARSE_24)
			if (!match) throw new Error('Could not parse time (string)')
			const parts = time.split(':')
			hour = parseInt(parts[0], 10)
			minute = parseInt(parts[1], 10)
		}
	} else if (typeof time === 'object') {
		if (!Number.isInteger(time.hour) || !Number.isInteger(time.minute)) {
			throw new Error('Time and minute must both be valid integers')
		}
		hour = time.hour
		minute = time.minute
		if ('meridiem' in time && typeof time.meridiem === 'string') {
			meridiem = time.meridiem.toLowerCase()
		}
	}

	if (minute > 60) throw new Error('Minute out of range (> 60)')

	if (meridiem) {
		if (hour > 12) throw new Error('Hour out of range (> 12)')
		if (meridiem === 'pm' && hour !== 12) hour += 12
		if (meridiem === 'am' && hour === 12) hour = 0
	} else {
		if (hour > 24) throw new Error('Hour out of range (> 24)')
		if (hour === 24) hour = 0
	}

	return { hour, minute }
}

export function parseMeridiem(time: TimeInput): 'am' | 'pm' {
	const { hour } = parseTime(time)
	return hour >= 12 ? 'pm' : 'am'
}

export function composeTime(
	hour: number,
	minute: number,
	disabledTimeRangeValidator: DisabledTimeRange | null,
): TimeOutput {
	const paddedMinute = minute.toString().padStart(2, '0')
	const hour24 = hour === 24 ? 0 : hour
	const meridiem: 'am' | 'pm' = hour24 >= 12 ? 'pm' : 'am'
	let hour12 = hour24
	if (hour24 > 12) hour12 -= 12
	if (hour24 === 0) hour12 = 12

	let isValid = true
	if (disabledTimeRangeValidator) {
		if (
			!disabledTimeRangeValidator.validateHour(hour24) ||
			!disabledTimeRangeValidator.validateMinute(hour24, minute)
		) {
			isValid = false
		}
	}

	return {
		formatted24: `${hour24}:${paddedMinute}`,
		formatted12: `${hour12}:${paddedMinute} ${meridiem}`,
		formattedSimple: `${hour12}:${paddedMinute}`,
		hour: hour24,
		hour12,
		minute,
		meridiem,
		isValid,
	}
}

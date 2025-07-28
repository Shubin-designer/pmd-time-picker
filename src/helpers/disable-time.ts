import { TIME_PARSE_24 } from './time'

function parseTime(time: string) {
	const match = time.match(TIME_PARSE_24)
	if (!match) {
		throw new Error('Could not parse time for disabled time range')
	}
	return {
		hour: parseInt(match[1], 10),
		minute: parseInt(match[2], 10),
	}
}

function generateHourValidator(
	fromH: number,
	fromM: number,
	toH: number,
	toM: number,
): (hour: number) => boolean {
	const isSameHour = fromH === toH
	if (fromH < toH || (isSameHour && fromM < toM)) {
		return hour => hour <= fromH || hour >= toH
	}
	return hour => hour <= fromH && hour >= toH
}

function generateMinuteValidator(
	fromH: number,
	fromM: number,
	toH: number,
	toM: number,
	hourValidator: (hour: number) => boolean,
): (hour: number, minute: number) => boolean {
	return (h, m) => {
		if (!hourValidator(h)) return false
		if (h === fromH) return m <= fromM
		if (h === toH) return m >= toM
		return true
	}
}

export default class DisabledTimeRange {
	validateHour: (hour: number) => boolean
	validateMinute: (hour: number, minute: number) => boolean

	constructor(from: string, to: string) {
		const { hour: fromH, minute: fromM } = parseTime(from)
		const { hour: toH, minute: toM } = parseTime(to)

		if (fromH === toH && fromM === toM) {
			throw new Error('Invalid time range: from and to times are equal')
		}

		this.validateHour = generateHourValidator(fromH, fromM, toH, toM)
		this.validateMinute = generateMinuteValidator(fromH, fromM, toH, toM, this.validateHour)
	}
}

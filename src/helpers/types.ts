import { MutableRefObject } from 'react'

export type ElementRef = MutableRefObject<HTMLDivElement | null>

// internal time representation (24-hour)
export interface Time {
	hour: number
	minute: number
}

export type Time24 = Time

export interface Time12 extends Time {
	meridiem: 'am' | 'pm'
}

export type TimeInput = string | Time24 | Time12 | null | undefined

export type ChangeTimeFn = (t: TimeOutput) => void

export interface TimeOutput {
	formatted12: string
	formattedSimple: string
	formatted24: string
	hour: number
	hour12: number
	minute: number
	meridiem: 'am' | 'pm'
	isValid: boolean
}

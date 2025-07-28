import { parseTime as parse } from '../time'

describe('helpers/parse-time', () => {
	describe('parse from string', () => {
		test('parses 12 hour format (am/pm, with/without space)', () => {
			expect(parse('8:32 am')).toEqual({ hour: 8, minute: 32 })
			expect(parse('12:32 am')).toEqual({ hour: 0, minute: 32 })
			expect(parse('12:32 pm')).toEqual({ hour: 12, minute: 32 })
			expect(parse('8:32am')).toEqual({ hour: 8, minute: 32 })
			expect(parse('12:32pm')).toEqual({ hour: 12, minute: 32 })
			expect(parse('0:32pm')).toEqual({ hour: 12, minute: 32 })
			expect(parse('3:32pm')).toEqual({ hour: 15, minute: 32 })
			expect(parse('7:00 AM')).toEqual({ hour: 7, minute: 0 })
			expect(parse('11:59 PM')).toEqual({ hour: 23, minute: 59 })
		})

		test('parses 24 hour format string', () => {
			expect(parse('8:32')).toEqual({ hour: 8, minute: 32 })
			expect(parse('18:30')).toEqual({ hour: 18, minute: 30 })
			expect(parse('0:30')).toEqual({ hour: 0, minute: 30 })
			expect(parse('12:00')).toEqual({ hour: 12, minute: 0 })
			expect(parse('24:30')).toEqual({ hour: 0, minute: 30 })
		})
	})

	describe('parse from object', () => {
		test('24h object format', () => {
			expect(parse({ hour: 6, minute: 32 })).toEqual({ hour: 6, minute: 32 })
			expect(parse({ hour: 14, minute: 5 })).toEqual({ hour: 14, minute: 5 })
			expect(parse({ hour: 24, minute: 0 })).toEqual({ hour: 0, minute: 0 })
		})

		test('12h object with meridiem', () => {
			expect(parse({ hour: 8, minute: 32, meridiem: 'am' })).toEqual({ hour: 8, minute: 32 })
			expect(parse({ hour: 2, minute: 45, meridiem: 'pm' })).toEqual({ hour: 14, minute: 45 })
			expect(parse({ hour: 12, minute: 0, meridiem: 'am' })).toEqual({ hour: 0, minute: 0 })
			expect(parse({ hour: 0, minute: 0, meridiem: 'pm' })).toEqual({ hour: 12, minute: 0 })
		})
	})

	describe('invalid time', () => {
		test('throws on bad string', () => {
			expect(() => parse('25:70 am')).toThrow()
			expect(() => parse('13:10 am')).toThrow()
			expect(() => parse('8:70 am')).toThrow()
			expect(() => parse('8:20 zz')).toThrow()
			expect(() => parse('25:50')).toThrow()
			expect(() => parse('12:70')).toThrow()
			expect(() => parse('25:70')).toThrow()
			expect(() => parse('random string')).toThrow()
		})

		test('throws on bad object', () => {
			expect(() => parse({ hour: 26, minute: 32 })).toThrow()
			expect(() => parse({ hour: 12, minute: 70 })).toThrow()
			expect(() => parse({ hour: 26, minute: 70 })).toThrow()
			// @ts-expect-error
			expect(() => parse({ someKey: 26, anotherKey: 70 })).toThrow()
		})
	})

	describe('empty input returns default', () => {
		const defaultTime = { hour: 12, minute: 30 }
		test('undefined/null returns default time', () => {
			expect(parse()).toEqual(defaultTime)
			expect(parse(null)).toEqual(defaultTime)
		})
	})
})

import DisabledTimeRange from '../disable-time'
import { composeTime as compose } from '../time'

describe('helpers/compose-time', () => {
	it('formats time correctly in 24h and 12h formats', () => {
		expect(compose(0, 30, null)).toMatchObject({
			formatted24: '0:30',
			formatted12: '12:30 am',
			formattedSimple: '12:30',
			hour: 0,
			hour12: 12,
			minute: 30,
			meridiem: 'am',
			isValid: true,
		})

		expect(compose(1, 30, null)).toMatchObject({
			formatted24: '1:30',
			formatted12: '1:30 am',
			formattedSimple: '1:30',
			hour: 1,
			hour12: 1,
			minute: 30,
			meridiem: 'am',
			isValid: true,
		})

		expect(compose(12, 30, null)).toMatchObject({
			formatted24: '12:30',
			formatted12: '12:30 pm',
			formattedSimple: '12:30',
			hour: 12,
			hour12: 12,
			minute: 30,
			meridiem: 'pm',
			isValid: true,
		})

		expect(compose(13, 30, null)).toMatchObject({
			formatted24: '13:30',
			formatted12: '1:30 pm',
			formattedSimple: '1:30',
			hour: 13,
			hour12: 1,
			minute: 30,
			meridiem: 'pm',
			isValid: true,
		})
	})

	it('pads minutes properly', () => {
		expect(compose(1, 5, null)).toHaveProperty('formatted24', '1:05')
		expect(compose(1, 0, null)).toHaveProperty('formatted24', '1:00')
	})

	it('evaluates validity with disabled time ranges', () => {
		const dtr = new DisabledTimeRange('6:20', '15:20')
		expect(compose(6, 20, dtr)).toHaveProperty('isValid', true)
		expect(compose(6, 21, dtr)).toHaveProperty('isValid', false)
		expect(compose(15, 20, dtr)).toHaveProperty('isValid', true)
		expect(compose(14, 59, dtr)).toHaveProperty('isValid', false)
	})
})

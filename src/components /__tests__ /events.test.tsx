import { fireEvent } from '@testing-library/react'
import {
	renderTK,
	mockAnimations,
	clickOnPoint,
	changeToMinutes,
	changeMeridiem,
} from './helpers/dom'
import {
	HOUR_12_INNER,
	HOUR_24_OUTER,
	HOUR_3_OUTER,
	HOUR_3_INNER,
	Coords,
	MINUTE_7,
	MINUTE_23,
	MINUTE_59,
	MIDNIGHT_OUTER_FROM_LEFT,
	MIDNIGHT_OUTER_FROM_RIGHT,
	MIDNIGHT_INNER_FROM_LEFT,
	MIDNIGHT_INNER_FROM_RIGHT,
	generateCoords,
} from './helpers/coords'
import { Props as TimekeeperProps } from '../TimeKeeperContainer'

jest.mock('lodash.debounce', () => ({
	__esModule: true,
	default: (fn: any) => fn,
}))

describe('handles events correctly', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	describe('updates hours', () => {
		function testHours(
			coords: Coords,
			expectedTime: string,
			opts: Partial<TimekeeperProps> = {},
		) {
			const { wrapper, onChange } = renderTK({
				time: { hour: 5, minute: 20 },
				...opts,
			})

			clickOnPoint(wrapper, coords)

			expect(onChange).toBeCalledTimes(2)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					formatted24: expectedTime,
				}),
			)
		}

		it('handles outer click on "3" during 12h mode', () => {
			testHours(HOUR_3_OUTER, '3:20')
		})
		it('handles inner click on "3" during 12h mode', () => {
			testHours(HOUR_3_INNER, '3:20')
		})
		it('handles outer click on "12" during 12h mode', () => {
			testHours(HOUR_24_OUTER, '0:20')
		})
		it('handles inner click on "12" during 12h mode', () => {
			testHours(HOUR_12_INNER, '0:20')
		})
		it('handles outer click on "3" during 24h mode', () => {
			testHours(HOUR_3_OUTER, '15:20', { hour24Mode: true })
		})
		it('handles inner click on "3" during 24h mode', () => {
			testHours(HOUR_3_INNER, '3:20', { hour24Mode: true })
		})
		it('handles outer click on "12" during 24h mode', () => {
			testHours(HOUR_24_OUTER, '0:20', { hour24Mode: true })
		})
		it('handles inner click on "12" during 24h mode', () => {
			testHours(HOUR_12_INNER, '12:20', { hour24Mode: true })
		})

		it('handles click on "12" from left during 12h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_LEFT, '0:20')
		})
		it('handles click on "12" from right during 12h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_RIGHT, '0:20')
		})
		it('handles outer click on "12" from left during 24h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_LEFT, '0:20', { hour24Mode: true })
		})
		it('handles outer click on "12" from right during 24h mode', () => {
			testHours(MIDNIGHT_OUTER_FROM_RIGHT, '0:20', { hour24Mode: true })
		})
		it('handles inner click on "12" from right during 24h mode', () => {
			testHours(MIDNIGHT_INNER_FROM_LEFT, '12:20', { hour24Mode: true })
		})
		it('handles inner click on "12" from right during 24h mode', () => {
			testHours(MIDNIGHT_INNER_FROM_RIGHT, '12:20', { hour24Mode: true })
		})
	})

	describe('updates minutes', () => {
		function testMinutes(
			coords: Coords,
			expectedTime: string,
			opts: TimekeeperProps = {},
		) {
			const { wrapper, onChange } = renderTK({
				time: { hour: 5, minute: 40 },
				...opts,
			})

			changeToMinutes(wrapper)

			clickOnPoint(wrapper, coords)

			expect(onChange).toBeCalledTimes(2)
			expect(onChange).toBeCalledWith(
				expect.objectContaining({
					formatted24: expectedTime,
				}),
			)
		}

		it('handles click on "15"', () => {
			testMinutes(HOUR_3_OUTER, '5:15')
		})
		it('handles click on "0"', () => {
			testMinutes(HOUR_12_INNER, '5:00')
		})
		it('handles coarse minutes', () => {
			testMinutes(MINUTE_7, '5:05')
		})
		it('handles custom coarse minutes', () => {
			testMinutes(MINUTE_23, '12:30', {
				time: '12:35',
				coarseMinutes: 15,
			})
		})
		it('handles coarse click on "59"', () => {
			testMinutes(MINUTE_59, '5:00')
		})
	})

	it('switches to minutes after selecting hour', () => {
		const { wrapper } = renderTK({ switchToMinuteOnHourSelect: true })
		const { getAllByTestId } = wrapper

		clickOnPoint(wrapper, HOUR_3_OUTER)
		expect(getAllByTestId('number_minute')).toHaveLength(12)
	})

	it('handles meridiem toggling', () => {
		const { onChange, wrapper } = renderTK({ time: { hour: 2, minute: 0 } })
		const { getByTestId } = wrapper
		fireEvent.click(getByTestId('meridiem_pm'))

		expect(onChange).toBeCalledTimes(1)
		expect(onChange).toBeCalledWith(
			expect.objectContaining({
				hour: 14,
			}),
		)
	})
})

import { fireEvent } from '@testing-library/react'
import { renderTK, mockAnimations, changeToMinutes } from './helpers/dom'

describe('Timekeeper', () => {
	beforeEach(() => {
		mockAnimations()
		jest.useFakeTimers()
	})

	describe('renders correctly', () => {
		it('supports 12h mode', () => {
			const { wrapper } = renderTK()
			const { getAllByTestId, getByTestId } = wrapper

			// hours
			expect(getAllByTestId('number_hour_outer')).toHaveLength(12)
			// meridiems
			expect(getByTestId('meridiem_am')).toBeTruthy()
			expect(getByTestId('meridiem_pm')).toBeTruthy()

			changeToMinutes(wrapper)
			// minutes
			expect(getAllByTestId('number_minute')).toHaveLength(12)
		})

		it('supports 24h mode', () => {
			const {
				wrapper: { getAllByTestId, queryByTestId },
			} = renderTK({ hour24Mode: true })

			// 1-12
			expect(getAllByTestId('number_hour_inner')).toHaveLength(12)
			// 13-24
			expect(getAllByTestId('number_hour_outer')).toHaveLength(12)

			// meridiems
			expect(queryByTestId('meridiem_am')).toBeNull()
			expect(queryByTestId('meridiem_pm')).toBeNull()
		})
	})

	describe('top bar', () => {
		it('supports 12h mode', () => {
			const {
				wrapper: { getByTestId },
			} = renderTK()

			expect(getByTestId('topbar')).toBeTruthy()
			expect(getByTestId('topbar_meridiem')).toBeTruthy()
		})

		it('supports 24h mode', () => {
			const {
				wrapper: { getByTestId, queryByTestId },
			} = renderTK({ hour24Mode: true })

			expect(getByTestId('topbar')).toBeTruthy()
			expect(queryByTestId('topbar_meridiem')).toBeNull()
		})
	})

	describe('done button', () => {
		it('displays nothing if done fn is not provided', () => {
			const {
				wrapper: { queryByTestId },
			} = renderTK()

			expect(queryByTestId('done-button')).toBeNull()
		})

		it('displays button if done fn provided', () => {
			const fn = jest.fn()
			const time = { hour: 12, minute: 30 }
			const {
				wrapper: { getByTestId },
			} = renderTK({ onDoneClick: fn, time })

			const btn = getByTestId('done-button')
			expect(btn).toBeTruthy()
			fireEvent.click(btn)

			expect(fn).toHaveBeenCalled()
			expect(fn).toBeCalledWith(
				expect.objectContaining({
					hour: time.hour,
					minute: time.minute,
				}),
				expect.objectContaining({
					type: 'click',
					target: expect.anything(),
				}),
			)
		})

		it('displays content if done render props fn provided', () => {
			const buttonContent = <div>click me</div>
			const doneButton = () => buttonContent
			const {
				wrapper: { getByText },
			} = renderTK({ doneButton })

			expect(getByText('click me')).toBeTruthy()
		})
	})
})

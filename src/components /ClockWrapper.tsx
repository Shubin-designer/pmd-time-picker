import { useCallback, useRef } from 'react'
import useConfig from '../hooks/useConfigContext'
import useTimekeeperState from '../hooks/useStateContext'
import useClockEvents from '../hooks/useClockEvents'

import Clock from './Clock'
import Meridiems from './Meridiems'
import style from './styles/clock-wrapper'

import { MODE, CLOCK_VALUES } from '../helpers/constants'
import { isHourMode, isMinuteMode } from '../helpers/utils'

export default function ClockWrapper() {
	const config = useConfig()
	const { mode, updateTimeValue } = useTimekeeperState()
	const clock = useRef<HTMLDivElement | null>(null)

	const calculateTimeValue = useCallback(
		(
			angle: number,
			{ canAutoChangeMode = false, wasTapped = false, isInnerClick = false },
		) => {
			const totalIncrements = CLOCK_VALUES[mode].increments
			let minIncrement = 1

			if (isMinuteMode(mode) && (wasTapped || config.forceCoarseMinutes)) {
				minIncrement = config.coarseMinutes
			}

			const val = (angle / 360) * totalIncrements
			let selected = Math.round(val / minIncrement) * minIncrement

			if (isHourMode(mode)) {
				selected = selected % 12
			}

			if (mode === MODE.HOURS_24 && config.hour24Mode) {
				if (!isInnerClick) selected += 12
				if (selected === 12) selected = 0
				else if (selected === 0) selected = 12
			}

			updateTimeValue(selected, { type: 'clock', canAutoChangeMode })
		},
		[
			mode,
			config.forceCoarseMinutes,
			config.coarseMinutes,
			config.hour24Mode,
			updateTimeValue,
		],
	)

	const { bind } = useClockEvents(clock, calculateTimeValue)

	return (
		<div
			{...bind}
			ref={clock}
			className="react-timekeeper__clock-wrapper"
			css={style}
			data-testid="clock-wrapper"
		>
			<Clock clockEl={clock} />
			{!config.hour24Mode && <Meridiems />}
		</div>
	)
}

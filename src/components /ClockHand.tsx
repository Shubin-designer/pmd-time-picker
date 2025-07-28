import { useEffect, useRef } from 'react'
import { animated, useSpring } from 'react-spring'

import { Time } from '../helpers/types'
import { getTimeValue, isSameTime } from '../helpers/utils'
import {
	CLOCK_SIZE,
	CLOCK_RADIUS,
	NUMBER_OUTER_POSITION,
	MODE,
	CLOCK_VALUES,
	getClockHandCirclePosition,
	getClockHandCircleRadius,
	getClockHandLength,
} from '../helpers/constants'
import {
	line as lineStyle,
	outerCircle as outerCircleStyle,
	centerCircle as centerCircleStyle,
	intermediateMinuteCircle as intermediateMinuteCircleStyle,
} from './styles/clock-hand'
import { calcAnimationAngle } from '../helpers/math'

interface Props {
	mode: MODE
	time: Time
}

function rotate(deg: number) {
	return `rotate(${deg} ${CLOCK_RADIUS} ${CLOCK_RADIUS})`
}

function getAngle(mode: MODE, time: Time) {
	const increments = CLOCK_VALUES[mode].increments
	const value = getTimeValue(mode, time)
	return value * (360 / increments)
}

export default function ClockHand({ mode, time }: Props) {
	const prevState = useRef({ time, mode })
	const dragCount = useRef(0)

	const inner = time.hour > 0 && time.hour <= 12
	const handLength = getClockHandLength(mode, inner)
	const circlePosition = getClockHandCirclePosition(mode, inner)
	const circleRadius = getClockHandCircleRadius(mode, inner)

	const [anim, api] = useSpring(() => ({
		immediate: true,
		rotation: getAngle(mode, time),
		length: handLength,
		position: circlePosition,
	}))

	const { rotation, length, position } = anim

	useEffect(() => {
		const current = rotation.get()
		const next = getAngle(mode, time)

		if (prevState.current.mode !== mode) {
			dragCount.current = 0
			prevState.current = { mode, time }

			const finalAngle = calcAnimationAngle(current, next)

			api.start({
				immediate: false,
				rotation: finalAngle,
				length: handLength,
				position: circlePosition,
			})
		} else if (!isSameTime(prevState.current.time, time)) {
			prevState.current.time = time
			dragCount.current++

			api.start({
				immediate: true,
				rotation: next,
				length: handLength,
				position: circlePosition,
			})
		}
	}, [mode, time, rotation, handLength, circlePosition, api])

	const value = getTimeValue(mode, time)
	const showIntermediateValueDisplay =
		mode === MODE.MINUTES && value % 5 ? (
			<circle
				className="react-timekeeper__hand-intermediate-circle"
				css={intermediateMinuteCircleStyle}
				cx={CLOCK_RADIUS}
				cy={NUMBER_OUTER_POSITION}
				r={4}
			/>
		) : null

	return (
		<svg
			width={CLOCK_SIZE}
			height={CLOCK_SIZE}
			viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
			xmlns="http://www.w3.org/2000/svg"
			className="react-timekeeper__clock-hand"
		>
			<animated.g transform={rotation.to(rotate)}>
				<animated.line
					className="react-timekeeper__clock-hand"
					css={lineStyle}
					x1={CLOCK_RADIUS}
					y1={CLOCK_RADIUS}
					x2={CLOCK_RADIUS}
					y2={length}
					strokeWidth="1"
					data-testid="clock-hand"
				/>
				<circle
					className="react-timekeeper__hand-circle-center"
					css={centerCircleStyle}
					cx={CLOCK_RADIUS}
					cy={CLOCK_RADIUS}
					r={1.5}
				/>
				<animated.circle
					className="react-timekeeper__hand-circle-outer"
					css={outerCircleStyle}
					cx={CLOCK_RADIUS}
					cy={position}
					r={circleRadius}
				/>
				{showIntermediateValueDisplay}
			</animated.g>
		</svg>
	)
}

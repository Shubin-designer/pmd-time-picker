import React, {
	useRef,
	useMemo,
	useReducer,
	useEffect,
	useContext,
	createContext,
	useCallback,
	ReactElement,
} from 'react'
import debounce from 'lodash.debounce'

import { parseTime, composeTime, parseMeridiem } from '../helpers/time'
import useConfig from './useConfigContext'
import { isHourMode, isMinuteMode, isSameTime } from '../helpers/utils'
import { TimeInput, ChangeTimeFn, Time, TimeOutput } from '../helpers/types'
import { MODE, MERIDIEM } from '../helpers/constants'
import DisabledTimeRange from '../helpers/disable-time'

interface Props {
	time?: TimeInput
	onChange?: ChangeTimeFn
	children: ReactElement
	disabledTimeRange?: { from: string; to: string } | null
}

interface GlobalState {
	time: Time
	mode: MODE
	meridiem: MERIDIEM
}

type UpdateTimeValueSource =
	| {
			type: 'clock'
			canAutoChangeMode: boolean
	  }
	| {
			type: 'dropdown'
	  }

interface StateContext {
	time: Time
	mode: MODE
	updateTimeValue: (val: number, source: UpdateTimeValueSource) => void
	updateMeridiem: (meridiem: MERIDIEM) => void
	setMode: (mode: MODE) => void
	getComposedTime: () => TimeOutput
	disabledTimeRangeValidator: DisabledTimeRange | null
	meridiem: MERIDIEM
}

const stateContext = createContext({} as StateContext)

function reducer(state: GlobalState, action: any): GlobalState {
	switch (action.type) {
		case 'SET_TIME':
			return {
				...state,
				time: action.time,
				meridiem: action.meridiem || state.meridiem,
			}
		case 'SET_MODE':
			return { ...state, mode: action.mode }
		case 'SET_MERIDIEM':
			return { ...state, meridiem: action.meridiem }
		default:
			return state
	}
}

function StateProvider({ onChange, time: parentTime, children, disabledTimeRange }: Props) {
	const config = useConfig()
	const [state, dispatch] = useReducer(reducer, null, () => ({
		time: parseTime(parentTime),
		mode: config.hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12,
		meridiem: parseMeridiem(parentTime),
	}))

	const { mode, time, meridiem } = state
	const refTime = useRef(time)
	const onChangeFn = useRef(onChange)
	const onDoneClickFn = useRef(config.onDoneClick)

	useEffect(() => {
		onChangeFn.current = onChange
	}, [onChange])

	useEffect(() => {
		onDoneClickFn.current = config.onDoneClick
	}, [config.onDoneClick])

	const disabledTimeRangeValidator = useMemo(() => {
		const from = disabledTimeRange?.from
		const to = disabledTimeRange?.to
		return from && to ? new DisabledTimeRange(from, to) : null
	}, [disabledTimeRange?.from, disabledTimeRange?.to])

	useEffect(() => {
		if (!parentTime) return
		const newTime = parseTime(parentTime)
		if (isSameTime(newTime, refTime.current)) return
		const action: any = { type: 'SET_TIME', time: newTime }
		if (!config.hour24Mode) action.meridiem = parseMeridiem(parentTime)
		dispatch(action)
	}, [config.hour24Mode, parentTime])

	const getComposedTime = useCallback(() => {
		const t = refTime.current
		return composeTime(t.hour, t.minute, disabledTimeRangeValidator)
	}, [disabledTimeRangeValidator])

	const debounceUpdateParent = useMemo(() => debounce(() => {
		if (typeof onChangeFn.current === 'function') {
			onChangeFn.current(getComposedTime())
		}
	}, 80), [getComposedTime])

	const updateTime = useCallback((newTime: Time, meridiem?: MERIDIEM) => {
		dispatch({ type: 'SET_TIME', time: newTime, meridiem })
		refTime.current = newTime
		debounceUpdateParent()
	}, [debounceUpdateParent])

	function updateMeridiem(newMeridiem: MERIDIEM) {
		if (meridiem === newMeridiem) return
		const hour = newMeridiem === 'am' ? time.hour - 12 : time.hour + 12
		updateTime({ ...time, hour }, newMeridiem)
	}

	const setMode = useCallback((mode: MODE) => {
		const m = isHourMode(mode) ? (config.hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12) : mode
		dispatch({ type: 'SET_MODE', mode: m })
	}, [config.hour24Mode])

	const handleUpdateTimeSideEffects = useCallback((source: UpdateTimeValueSource) => {
		if (source.type === 'clock' && source.canAutoChangeMode) {
			if (config.switchToMinuteOnHourSelect && isHourMode(mode)) {
				setMode(MODE.MINUTES)
			} else if (config.closeOnMinuteSelect && isMinuteMode(mode) && onDoneClickFn.current) {
				onDoneClickFn.current(getComposedTime())
			}
		} else if (source.type === 'dropdown') {
			if (config.switchToMinuteOnHourDropdownSelect && isHourMode(mode)) {
				setMode(MODE.MINUTES)
			}
		}
	}, [
		config.switchToMinuteOnHourSelect,
		config.closeOnMinuteSelect,
		config.switchToMinuteOnHourDropdownSelect,
		getComposedTime,
		mode,
		setMode,
	])

	const updateTimeValue = useCallback((val: number, source: UpdateTimeValueSource) => {
		val = val % 60
		if (mode === MODE.HOURS_12 && meridiem === 'pm') val += 12
		const unit = isHourMode(mode) ? 'hour' : 'minute'
		const time = refTime.current

		if (time[unit] === val && source.type === 'clock' && !source.canAutoChangeMode) return

		if (disabledTimeRangeValidator) {
			if ((isHourMode(mode) && !disabledTimeRangeValidator.validateHour(val)) ||
				(isMinuteMode(mode) && !disabledTimeRangeValidator.validateMinute(time.hour, val))) {
				return
			}
		}

		handleUpdateTimeSideEffects(source)
		updateTime({ ...time, [unit]: val })
	}, [mode, meridiem, handleUpdateTimeSideEffects, disabledTimeRangeValidator, updateTime])

	const value: StateContext = {
		time,
		mode,
		updateTimeValue,
		updateMeridiem,
		setMode,
		getComposedTime,
		disabledTimeRangeValidator,
		meridiem,
	}

	return <stateContext.Provider value={value}>{children}</stateContext.Provider>
}

export { StateProvider, stateContext }

export default function useTimekeeperState(): StateContext {
	return useContext(stateContext)
}

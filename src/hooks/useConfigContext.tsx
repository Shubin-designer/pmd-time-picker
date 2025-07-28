import React, { useContext, createContext, ReactElement, useMemo } from 'react'
import { TimeOutput } from '../helpers/types'

export type DoneClickFn = ((time: TimeOutput, event?: React.MouseEvent) => void) | null
export type DoneButton = ((time: TimeOutput) => ReactElement) | null

interface Config {
	coarseMinutes: number
	forceCoarseMinutes: boolean
	switchToMinuteOnHourSelect: boolean
	switchToMinuteOnHourDropdownSelect: boolean
	closeOnMinuteSelect: boolean
	hour24Mode: boolean
	onDoneClick: DoneClickFn
	doneButton: DoneButton
}

export type ConfigProps = Partial<Config>

interface Props extends ConfigProps {
	children: ReactElement
}

const configContext = createContext<Config>({} as Config)

function ConfigProvider({
	children,
	coarseMinutes = 5,
	forceCoarseMinutes = false,
	switchToMinuteOnHourSelect = false,
	switchToMinuteOnHourDropdownSelect = false,
	closeOnMinuteSelect = false,
	hour24Mode = false,
	onDoneClick = null,
	doneButton = null,
}: Props) {
	const config = useMemo<Config>(() => {
		if (coarseMinutes < 1) {
			throw new Error('coarseMinutes must be at least 1')
		}
		return {
			coarseMinutes,
			forceCoarseMinutes,
			switchToMinuteOnHourSelect,
			switchToMinuteOnHourDropdownSelect,
			closeOnMinuteSelect,
			hour24Mode,
			onDoneClick,
			doneButton,
		}
	}, [
		coarseMinutes,
		forceCoarseMinutes,
		switchToMinuteOnHourSelect,
		switchToMinuteOnHourDropdownSelect,
		closeOnMinuteSelect,
		hour24Mode,
		onDoneClick,
		doneButton,
	])

	return <configContext.Provider value={config}>{children}</configContext.Provider>
}

function useConfig(): Config {
	return useContext(configContext)
}

export { ConfigProvider, useConfig, configContext }

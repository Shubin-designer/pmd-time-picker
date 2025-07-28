import { useState } from 'react'

import TimeDropdown from './TimeDropdown'
import useTimekeeperState from '../hooks/useStateContext'
import useConfig from '../hooks/useConfigContext'
import * as styles from './styles/top-bar'
import { MODE, MERIDIEM } from '../helpers/constants'
import { isHourMode } from '../helpers/utils'

export default function TopBar() {
	const { hour24Mode } = useConfig()
	const { mode, time, updateMeridiem, setMode } = useTimekeeperState()
	const [open, setOpen] = useState<null | 'hour' | 'minute'>(null)

	const isHour = isHourMode(mode)
	const formattedMinute = ('0' + time.minute).slice(-2)
	const hour = hour24Mode ? time.hour : time.hour % 12 === 0 ? 12 : time.hour % 12
	const meridiem = time.hour >= 12 ? MERIDIEM.pm : MERIDIEM.am

	function toggleMeridiem() {
		const m = meridiem === MERIDIEM.am ? MERIDIEM.pm : MERIDIEM.am
		updateMeridiem(m)
	}

	function timeClick(type: 'minute' | 'hour') {
		const current = isHour ? 'hour' : 'minute'

		if (type === current) {
			// если второй клик по активному элементу — открываем инпут
			setOpen(type)
		} else {
			// иначе переключаем режим
			if (type === 'hour') {
				setMode(hour24Mode ? MODE.HOURS_24 : MODE.HOURS_12)
			} else {
				setMode(MODE.MINUTES)
			}
			setOpen(null)
		}
	}

	const closeDropdown = () => setOpen(null)

	return (
		<div
			css={styles.wrapper(hour24Mode)}
			className="react-timekeeper__top-bar"
			data-testid="topbar"
		>
			{/* hour */}
			<div
				css={styles.hourWrapper(hour24Mode)}
				className="react-timekeeper__tb-minute-wrapper"
			>
				<span
					css={[styles.time(isHour)]}
					onClick={() => timeClick('hour')}
					data-testid="topbar_hour"
					className={`react-timekeeper__tb-hour ${
						isHour ? 'react-timekeeper__tb-hour--active' : ''
					}`}
				>
					{hour}
				</span>
				{open === 'hour' && <TimeDropdown close={closeDropdown} />}
			</div>

			<span css={styles.colon} className="react-timekeeper__tb-colon">:</span>

			{/* minute */}
			<div
				css={styles.minuteWrapper(hour24Mode)}
				className="react-timekeeper__tb-hour-wrapper"
			>
				<span
					css={styles.time(!isHour)}
					onClick={() => timeClick('minute')}
					data-testid="topbar_minute"
					className={`react-timekeeper__tb-minute ${
						isHour ? '' : 'react-timekeeper__tb-minute--active'
					}`}
				>
					{formattedMinute}
				</span>
				{open === 'minute' && <TimeDropdown close={closeDropdown} />}
			</div>

			{/* meridiem */}
			{!hour24Mode && (
				<button
					name="meridiem"
					type="button"
					onClick={toggleMeridiem}
					css={styles.meridiem}
					data-testid="topbar_meridiem"
					className="react-timekeeper-button-reset react-timekeeper__tb-meridiem"
				>
					{meridiem}
				</button>
			)}
		</div>
	)
}

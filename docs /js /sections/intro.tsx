import { useState, useCallback } from 'react'
import Timekeeper, { TimeOutput } from '@tk'

import { Github, Plug } from '../components/icons'
import Link from '../components/link'

export default function Intro() {
	const [isVisible, setVisibility] = useState(true)
	const [time, setTime] = useState(() => {
		const date = new Date()
		const h = date.getHours() % 12 || 12
		const min = String(date.getMinutes()).padStart(2, '0')
		const meridiem = date.getHours() >= 12 ? 'PM' : 'AM'
		return `${h}:${min} ${meridiem}`
	})

	const updateTime = useCallback((t: TimeOutput) => {
		setTime(t.formatted12)
	}, [])

	return (
		<section className="intro-demo">
			<h1>React Timekeeper</h1>
			<p className="intro-description">
				Time picker based on the style of the{' '}
				<Link href="https://play.google.com/store/apps/details?id=com.google.android.keep">
					Android Google Keep
				</Link>{' '}
				app
			</p>

			<div className="action-buttons">
				<Link href="https://github.com/catc/react-timekeeper" samePage>
					<Github /> Source
				</Link>
				<Link href="#examples" samePage>
					<Plug /> Examples
				</Link>
			</div>

			<div className="intro-demo-wrapper">
				<div className="intro-demo-picker">
					{isVisible && (
						<div className="intro-demo-picker__wrapper">
							<Timekeeper
								time={time}
								onChange={updateTime}
								switchToMinuteOnHourSelect
								onDoneClick={() => setVisibility(false)}
							/>
						</div>
					)}
				</div>
				<span onClick={() => setVisibility(true)} className="selected-demo-time">
					The time is currently <strong>{time}</strong>
					{!isVisible && (
						<span className="selected-demo-time__hint">Click to open</span>
					)}
				</span>
			</div>
		</section>
	)
}

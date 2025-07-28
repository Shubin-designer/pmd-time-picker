import useConfig from '../hooks/useConfigContext'
import useTimekeeperState from '../hooks/useStateContext'
import style from './styles/done-button'

export default function DoneButton() {
	const { onDoneClick, doneButton } = useConfig()
	const { getComposedTime } = useTimekeeperState()
	const time = getComposedTime()

	if (doneButton) {
		return doneButton(time)
	}

	if (onDoneClick) {
		return (
			<span
				css={style}
				onClick={e => onDoneClick(time, e)}
				className="react-timekeeper__done-button"
				data-testid="done-button"
			>
				Done
			</span>
		)
	}

	return null
}

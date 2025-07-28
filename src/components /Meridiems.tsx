import { meridiemWrapper, meridiem } from './styles/meridiems'
import { MERIDIEM } from '../helpers/constants'

interface Props {
	value: MERIDIEM
	onChange: (meridiem: MERIDIEM) => void
}

export default function Meridiems({ value, onChange }: Props) {
	const isPM = value === MERIDIEM.pm

	return (
		<div css={meridiemWrapper}>
			<button
				type="button"
				css={meridiem({ isSelected: !isPM })}
				data-testid="meridiem_am"
				className={`react-timekeeper-button-reset react-timekeeper__meridiem-toggle ${
					!isPM ? 'react-timekeeper__meridiem--active' : ''
				}`}
				onClick={() => onChange(MERIDIEM.am)}
			>
				AM
			</button>
			<button
				type="button"
				css={meridiem({ isRight: true, isSelected: isPM })}
				data-testid="meridiem_pm"
				className={`react-timekeeper-button-reset react-timekeeper__meridiem-toggle ${
					isPM ? 'react-timekeeper__meridiem--active' : ''
				}`}
				onClick={() => onChange(MERIDIEM.pm)}
			>
				PM
			</button>
		</div>
	)
}

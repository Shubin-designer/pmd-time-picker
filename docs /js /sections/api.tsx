import Text from '../components/text'
import Link from '../components/link'
import Code, { SYNTAX } from '../components/code'

export default function API() {
	return (
		<section className="api docs-section" id="api">
			<h2>API</h2>

			{/* time */}
			<h3 className="h3-api">
				<code className="name">time</code>
				<span className="accepts">TimeInput</span>(default:{' '}
				<code className="default">null</code>)
			</h3>

			<div className="api__description">
				<Text>Time to set on component. Accepts time in 4 formats:</Text>
				<Code type={SYNTAX.js}>{`// TimeInput

// string with meridiem
'4:55 pm'
'4:55pm'

// string without meridiem (assumes a 24 hour format)
'16:55'

// object with meridiem
{
	hour: 4,
	minute: 55,
	meridiem: 'pm'
}

// object without meridiem (assumes a 24 hour format)
{
	hour: 16,
	minute: 55
}`}</Code>
			</div>

			{/* onChange */}
			<h3 className="h3-api">
				<code className="name">onChange</code>
				<span className="accepts">(TimeOutput) {`=>`} void</span>(default:{' '}
				<code className="default">null</code>)
			</h3>

			<div className="api__description">
				<Text>
					Pass a function to be called when time is changed. Used to update time
					state in parent component. Function called returns object with updated
					time.
				</Text>
				<Code type={SYNTAX.js}>{`// TimeOutput
{
	formatted24: '16:55',
	formatted12: '4:55 pm',
	formattedSimple: '4:55',
	hour: 16,
	hour12: 4,
	minute: 55,
	meridiem: 'pm',
	isValid: boolean
}`}</Code>
			</div>

			{/* hour24Mode */}
			<h3 className="h3-api">
				<code className="name">hour24Mode</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>
			<div className="api__description">
				<Text>Set hour mode to 24 hours</Text>
			</div>

			{/* switchToMinuteOnHourSelect */}
			<h3 className="h3-api">
				<code className="name">switchToMinuteOnHourSelect</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>
			<div className="api__description">
				<Text>
					Changes clock unit from hour to minute after selecting an hour. Exists
					mainly to provides a better user experience.
				</Text>
			</div>

			{/* switchToMinuteOnHourDropdownSelect */}
			<h3 className="h3-api">
				<code className="name">switchToMinuteOnHourDropdownSelect</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>
			<div className="api__description">
				<Text>
					Changes clock unit from hour to minute after selecting an hour via the
					dropdown.
				</Text>
			</div>

			{/* closeOnMinuteSelect */}
			<h3 className="h3-api">
				<code className="name">closeOnMinuteSelect</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>
			<div className="api__description">
				<Text>
					Whether or not to trigger "Done" button click when the user selects
					minutes. Similar to Google Keep functionality.
				</Text>
			</div>

			{/* coarseMinutes */}
			<h3 className="h3-api">
				<code className="name">coarseMinutes</code>
				<span className="accepts">number</span>(default:{' '}
				<code className="default">5</code>)
			</h3>
			<div className="api__description">
				<Text>
					Rounds selected minute to increments (e.g., tapping on 23 rounds to 25).
				</Text>
			</div>

			{/* forceCoarseMinutes */}
			<h3 className="h3-api">
				<code className="name">forceCoarseMinutes</code>
				<span className="accepts">boolean</span>(default:{' '}
				<code className="default">false</code>)
			</h3>
			<div className="api__description">
				<Text>
					Always rounds to <code>coarseMinutes</code>, even on drag.
				</Text>
			</div>

			{/* onDoneClick */}
			<h3 className="h3-api">
				<code className="name">onDoneClick</code>
				<span className="accepts">(TimeOutput, Event) {`=>`} void</span>(default:{' '}
				<code className="default">null</code>)
			</h3>
			<div className="api__description">
				<Text>
					Displays "Done" button and triggers callback on click. Use to close
					timepicker, etc.
				</Text>
			</div>

			{/* doneButton */}
			<h3 className="h3-api">
				<code className="name">doneButton</code>
				<span className="accepts">(TimeOutput) {`=>`} React.ReactNode</span>
				(default: <code className="default">null</code>)
			</h3>
			<div className="api__description">
				<Text>Custom render function for the Done button.</Text>
			</div>

			{/* disabledTimeRange */}
			<h3 className="h3-api">
				<code className="name">disabledTimeRange</code>
				<span className="accepts">{`{ from: string, to: string }`}</span>(default:{' '}
				<code className="default">null</code>)
			</h3>
			<div className="api__description">
				<Text>
					Disables selection within specified range (24h format only).
					Use <code>isValid</code> from <code>TimeOutput</code> to check.
				</Text>
			</div>

			{/* custom styling */}
			<h3 className="h3-api">
				<code className="name">custom styling</code>
			</h3>
			<div className="api__description">
				<Text>
					<Link samePage href="#custom-styles">
						See below for examples
					</Link>
				</Text>
			</div>
		</section>
	)
}

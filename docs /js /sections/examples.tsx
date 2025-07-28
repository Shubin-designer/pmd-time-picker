<Code type={SYNTAX.js}>{`import React from 'react';
import TimeKeeper from 'react-timekeeper';

function YourComponent(){
	const [time, setTime] = useState('12:34pm')
	const [isValid, setIsValid] = useState(true)

	return (
		<div>
			<TimeKeeper
				time={time}
				onChange={(newTime) => {
					setIsValid(newTime.isValid)
					setTime(newTime.formatted12)
				}}
				disabledTimeRange={{ from: '6:20', to: '20:45' }}
			/>
			<span>Time is {time}, valid time: {isValid ? '✅' : '❌'}</span>
		</div>
	)
}`}</Code>

import React from 'react'
import ReactDOM from 'react-dom'
import Content from './content'

ReactDOM.render(
	<React.StrictMode>
		<Content />
	</React.StrictMode>,
	document.getElementById('root')
)

// Empty export to prevent isolatedModules error with Babel/TypeScript
export {}

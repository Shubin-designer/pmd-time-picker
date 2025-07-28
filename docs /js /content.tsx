import { useLayoutEffect } from 'react'
import '../css/style.scss'

// @ts-ignore
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import scss from 'highlight.js/lib/languages/scss'
import 'highlight.js/styles/dracula.css'

import Intro from './sections/intro'
import Installation from './sections/installation'
import API from './sections/api'
import Examples from './sections/examples'
import Other from './sections/other'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('scss', scss)

function Content() {
	useLayoutEffect(() => {
		hljs.highlightAll()
	}, [])

	return (
		<>
			<Intro />
			<Installation />
			<API />
			<Examples />
			<Other />
		</>
	)
}

export default Content

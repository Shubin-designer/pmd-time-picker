import React from 'react'

export enum SYNTAX {
	js = 'language-javascript',
	css = 'language-scss',
}

interface Props extends React.HTMLAttributes<HTMLElement> {
	inline?: boolean
	type?: SYNTAX
	children: React.ReactNode
}

export default function Code({
	inline = false,
	children,
	type = SYNTAX.js,
	className = '',
	...rest
}: Props) {
	if (inline) {
		return (
			<code className={className} {...rest}>
				{children}
			</code>
		)
	}

	return (
		<pre className={className} {...rest}>
			<code className={type}>{children}</code>
		</pre>
	)
}

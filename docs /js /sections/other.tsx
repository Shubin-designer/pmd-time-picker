import Text from '../components/text'
import Link from '../components/link'
import Code, { SYNTAX } from '../components/code'

export default function Other() {
	return (
		<section className="docs-section" id="custom-styles">
			<h2>Custom styles</h2>
			<div className="examples__item">
				<Text>There are two ways to customize styles:</Text>

				<Text>
					<strong>1. CSS Variables:</strong> for overriding core styles like colors, fonts, backgrounds. See{' '}
					<Link
						samePage
						href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties"
					>
						this MDN guide
					</Link>{' '}
					for more details.
				</Text>

				<Code type={SYNTAX.css}>
					{`/* global override */
:root {
  --meridiem-bg-color: green;
  --meridiem-text-color: red;
}

/* scoped override */
.custom-container {
  --meridiem-bg-color: green;
  --meridiem-text-color: red;
}`}
				</Code>

				<Text>Supported CSS variables include:</Text>
				<Code type={SYNTAX.css}>
					{`/* main wrapper */
--main-box-shadow
--main-bg
--main-font-family

/* top bar */
--top-bg
--top-colon-color
--top-text-color
--top-selected-color
--top-meridiem-color

/* time dropdown */
--dropdown-border
--dropdown-shadow
--dropdown-text-color
--dropdown-text-color-disabled
--dropdown-hover-bg

/* clock wrapper */
--clock-wrapper-bg
--clock-bg

/* clock hand */
--hand-line-color
--hand-circle-center
--hand-circle-outer
--hand-minute-circle

/* numbers */
--numbers-text-color
--numbers-text-color-disabled
--numbers-font-size-reg
--numbers-font-size-inner
--numbers-font-size-outer

/* meridiem buttons */
--meridiem-bg-color
--meridiem-text-color
--meridiem-selected-bg-color
--meridiem-selected-text-color

/* done button */
--done-bg-color
--done-text-color
--done-border-top
--done-font-size
--done-font-weight`}
				</Code>

				<hr />

				<Text>
					<strong>2. Higher CSS Specificity:</strong> to override Emotion styles, wrap your overrides in a parent
					class or selector with higher specificity:
				</Text>
				<Code type={SYNTAX.css}>
					{`/* ❌ won't work - same specificity as Emotion */
.react-timekeeper__clock-wrapper {
  background: red;
}

/* ✅ will work - higher specificity */
.custom-wrapper .react-timekeeper__clock-wrapper {
  background: red;
}`}
				</Code>
			</div>
		</section>
	)
}

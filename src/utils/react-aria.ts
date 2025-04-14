import { composeRenderProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { cn } from './cn';

export const focusRing = tv({
	base: 'outline ring-1 ring-ring forced-colors:outline-[Highlight] outline-offset-2',
	variants: {
		isFocusVisible: {
			false: 'outline-0',
			true: 'outline-2',
		},
	},
});

export const composeTailwindRenderProps = <T>(
	className: string | ((v: T) => string) | undefined,
	tw: string
): string | ((v: T) => string) => {
	return composeRenderProps(className, (className) => cn(tw, className));
};

'use client';

import React from 'react';
import {
	Popover as AriaPopover,
	PopoverProps as AriaPopoverProps,
	composeRenderProps,
	OverlayArrow,
	PopoverContext,
	useSlottedContext,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

export interface PopoverProps extends Omit<AriaPopoverProps, 'children'> {
	showArrow?: boolean;
	children: React.ReactNode;
}

const styles = tv({
	base: 'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 z-50 w-72 rounded-md border p-4 shadow-lg outline-none',
	variants: {
		isEntering: {
			true: 'animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 placement-left:slide-in-from-right-1 placement-right:slide-in-from-left-1 duration-200 ease-out',
		},
		isExiting: {
			true: 'animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 placement-left:slide-out-to-right-1 placement-right:slide-out-to-left-1 duration-150 ease-in',
		},
	},
});

export const Popover = ({ children, showArrow, className, ...props }: PopoverProps) => {
	const popoverContext = useSlottedContext(PopoverContext)!;
	const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger';
	let offset = showArrow ? 12 : 8;
	offset = isSubmenu ? offset - 6 : offset;

	return (
		<AriaPopover
			offset={offset}
			{...props}
			className={composeRenderProps(className, (className, renderProps) => styles({ ...renderProps, className }))}
		>
			{showArrow && (
				<OverlayArrow className='group'>
					<svg
						width={12}
						height={12}
						viewBox='0 0 12 12'
						className='group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90 fill-popover stroke-border block stroke-1'
					>
						<path d='M0 0 L6 6 L12 0' />
					</svg>
				</OverlayArrow>
			)}
			{children}
		</AriaPopover>
	);
};

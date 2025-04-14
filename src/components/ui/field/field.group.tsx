'use client';

import { composeRenderProps, Group, GroupProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

export const fieldGroupStyles = tv({
	base: 'group border-input bg-background file:bg-background file:text-foreground placeholder:text-muted-foreground focus-within:ring-ring invalid:border-destructive flex h-9 w-full items-center rounded-md border text-base transition-colors file:border-0 file:text-sm file:font-medium focus-within:ring-1 focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm forced-colors:bg-[Field]',
});

export const FieldGroup = (props: GroupProps) => {
	return (
		<Group
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				fieldGroupStyles({ ...renderProps, className })
			)}
		/>
	);
};

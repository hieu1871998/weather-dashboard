'use client';

import { composeTailwindRenderProps } from '@/utils/react-aria';
import { FieldError as AriaFieldError, FieldErrorProps } from 'react-aria-components';

export const FieldError = (props: FieldErrorProps) => {
	return (
		<AriaFieldError
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				'text-xs font-medium text-destructive forced-colors:text-[Mark]'
			)}
		/>
	);
};

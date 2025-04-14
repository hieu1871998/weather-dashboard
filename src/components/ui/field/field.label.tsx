'use client';

import { cn } from '@/utils/cn';
import { Label as AriaLabel, LabelProps } from 'react-aria-components';

export const Label = (props: LabelProps) => {
	return (
		<AriaLabel
			{...props}
			className={cn(
				'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
				props.className
			)}
		/>
	);
};

'use client';

import { cn } from '@/utils/cn';
import { Dialog as AriaDialog, DialogProps } from 'react-aria-components';

export const Dialog = (props: DialogProps) => {
	return (
		<AriaDialog
			{...props}
			className={cn('relative max-h-[inherit] overflow-auto p-6 outline-0 [[data-placement]>&]:p-4', props.className)}
		/>
	);
};

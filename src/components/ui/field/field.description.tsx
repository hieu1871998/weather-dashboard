'use client';

import { cn } from '@/utils/cn';
import { Text, TextProps } from 'react-aria-components';

export const FieldDescription = (props: TextProps) => {
	return (
		<Text
			{...props}
			slot='description'
			className={cn('text-xs text-muted-foreground', props.className)}
		/>
	);
};

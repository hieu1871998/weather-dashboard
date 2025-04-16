'use client';

import { Header as AriaHeader } from 'react-aria-components';
import { ThemeToggle } from '../theme-toggle';

export const Header = (props: React.ComponentProps<'header'>) => {
	return (
		<AriaHeader
			{...props}
			className='bg-background sticky top-2 z-50 flex items-center rounded-xl border px-5 py-2'
		>
			<div className='flex h-full w-full items-center justify-between'>
				<span className='text-xl font-bold'>Weather Dashboard</span>
			</div>
			<ThemeToggle />
		</AriaHeader>
	);
};

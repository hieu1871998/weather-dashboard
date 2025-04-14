'use client';

import { Header as AriaHeader } from 'react-aria-components';

export const Header = (props: React.ComponentProps<'header'>) => {
	return (
		<AriaHeader
			{...props}
			className='sticky top-0 flex h-12 border-b px-5 py-2'
		>
			<div className='flex h-full w-full items-center justify-between'>
				<span className='text-xl font-bold'>Weather</span>
			</div>
		</AriaHeader>
	);
};

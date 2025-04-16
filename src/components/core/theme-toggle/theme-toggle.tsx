'use client';

import { LaptopMinimalIcon, Moon, MoonIcon, Sun, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Menu, MenuItem } from '@/components/ui/menu';
import { Key, MenuTrigger } from 'react-aria-components';

export const ThemeToggle = () => {
	const { theme = 'system', setTheme } = useTheme();

	const handleAction = (key: Key) => {
		setTheme(key.toString());
	};

	const items = [
		{
			id: 'system',
			name: (
				<>
					<LaptopMinimalIcon />
					System
				</>
			),
		},
		{
			id: 'light',
			name: (
				<>
					<SunIcon />
					Light
				</>
			),
		},
		{
			id: 'dark',
			name: (
				<>
					<MoonIcon />
					Dark
				</>
			),
		},
	];

	return (
		<MenuTrigger>
			<Button
				variant='outline'
				size='sm'
				iconOnly
			>
				<Sun className='scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
				<Moon className='absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
			</Button>
			<Menu
				selectionMode='single'
				selectedKeys={[theme]}
				items={items}
				onAction={handleAction}
			>
				{item => <MenuItem>{item.name}</MenuItem>}
			</Menu>
		</MenuTrigger>
	);
};

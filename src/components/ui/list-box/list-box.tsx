'use client';

import { composeTailwindRenderProps } from '@/utils/react-aria';
import { CheckIcon } from 'lucide-react';
import {
	ListBox as AriaListBox,
	ListBoxItem as AriaListBoxItem,
	ListBoxProps as AriaListBoxProps,
	Collection,
	Header,
	ListBoxItemProps,
	ListBoxSection,
	SectionProps,
	composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

type ListBoxProps<T> = Omit<AriaListBoxProps<T>, 'layout' | 'orientation'>;

export const ListBox = <T extends object>({ children, ...props }: ListBoxProps<T>) => {
	return (
		<AriaListBox
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				'rounded-lg border border-gray-300 p-1 outline-0 dark:border-zinc-600'
			)}
		>
			{children}
		</AriaListBox>
	);
};

export const itemStyles = tv({
	base: 'group hover:bg-accent selected:bg-primary selected:text-primary-foreground selected:-outline-offset-4 selected:[&+[data-selected]]:rounded-t-none selected:[&:has(+[data-selected])]:rounded-b-none disabled:text-muted-foreground relative flex cursor-default items-center gap-8 rounded-md px-2.5 py-1.5 text-sm -outline-offset-2 will-change-transform forced-color-adjust-none select-none',
});

export const ListBoxItem = (props: ListBoxItemProps) => {
	const textValue = props.textValue || (typeof props.children === 'string' ? props.children : undefined);

	return (
		<AriaListBoxItem
			{...props}
			textValue={textValue}
			className={itemStyles}
		>
			{composeRenderProps(props.children, children => (
				<>
					{children}
					<div className='absolute right-4 bottom-0 left-4 hidden h-px bg-white/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block' />
				</>
			))}
		</AriaListBoxItem>
	);
};

export const dropdownItemStyles = tv({
	base: 'group focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none disabled:pointer-events-none disabled:opacity-50',
	compoundVariants: [
		{
			isFocused: false,
			isOpen: true,
			className: 'bg-accent',
		},
	],
});

export const DropdownItem = (props: ListBoxItemProps) => {
	const textValue = props.textValue || (typeof props.children === 'string' ? props.children : undefined);
	return (
		<AriaListBoxItem
			{...props}
			textValue={textValue}
			className={dropdownItemStyles}
		>
			{composeRenderProps(props.children, (children, { isSelected }) => (
				<>
					<span className='group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal'>
						{children}
					</span>
					<span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
						{isSelected && <CheckIcon className='h-4 w-4' />}
					</span>
				</>
			))}
		</AriaListBoxItem>
	);
};

export interface DropdownSectionProps<T> extends SectionProps<T> {
	title?: string;
	items?: Iterable<T>;
}

export const DropdownSection = <T extends object>(props: DropdownSectionProps<T>) => {
	return (
		<ListBoxSection className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
			<Header className='border-border bg-muted/60 text-muted-foreground supports-[-moz-appearance:none]:bg-muted sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y px-4 py-1 text-sm font-semibold backdrop-blur-md'>
				{props.title}
			</Header>
			<Collection items={props.items}>{props.children}</Collection>
		</ListBoxSection>
	);
};

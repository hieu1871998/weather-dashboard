'use client';

import { composeTailwindRenderProps } from '@/utils/react-aria';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';
import {
	Select as AriaSelect,
	SelectProps as AriaSelectProps,
	Button,
	ListBox,
	ListBoxItemProps,
	SelectValue,
	ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { FieldDescription, FieldError, Label } from '../field';
import { DropdownItem, DropdownSection, DropdownSectionProps } from '../list-box';
import { Popover } from '../popover';

const styles = tv({
	base: 'border-input ring-offset-background data-[placeholder]:text-muted-foreground focus:ring-ring bg-background flex h-9 w-full items-center justify-between rounded-md border px-3 py-2 text-sm whitespace-nowrap focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
});

export interface SelectProps<T extends object> extends Omit<AriaSelectProps<T>, 'children'> {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	items?: Iterable<T>;
	children: React.ReactNode | ((item: T) => React.ReactNode);
	placeholder?: string;
}

export const Select = <T extends object>({
	label,
	description,
	errorMessage,
	children,
	items,
	placeholder,
	...props
}: SelectProps<T>) => {
	return (
		<AriaSelect
			{...props}
			className={composeTailwindRenderProps(props.className, 'group flex flex-col gap-1')}
		>
			{label && <Label>{label}</Label>}
			<Button className={styles}>
				<SelectValue className='placeholder-shown:text-muted-foreground flex-1 text-left text-sm'>
					{({ defaultChildren, isPlaceholder }) => {
						return isPlaceholder ? placeholder : defaultChildren;
					}}
				</SelectValue>
				<ChevronDownIcon
					aria-hidden
					className='text-muted-foreground h-4 w-4 transition-transform group-open:rotate-180'
				/>
			</Button>
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError>{errorMessage}</FieldError>
			<Popover className='min-w-(--trigger-width) p-0'>
				<ListBox
					className='p-1'
					items={items}
				>
					{children}
				</ListBox>
			</Popover>
		</AriaSelect>
	);
};

export const SelectItem = (props: ListBoxItemProps) => {
	return <DropdownItem {...props} />;
};

export const SelectSection = <T extends object>(props: DropdownSectionProps<T>) => {
	return <DropdownSection {...props} />;
};

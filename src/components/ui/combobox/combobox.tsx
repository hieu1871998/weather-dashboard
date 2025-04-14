'use client';

import { Button } from '@/components/ui/button';
import { FieldDescription, FieldError, FieldGroup, Input, Label } from '@/components/ui/field';
import { DropdownItem, DropdownSection, DropdownSectionProps } from '@/components/ui/list-box';
import { Popover } from '@/components/ui/popover';
import { composeTailwindRenderProps } from '@/utils/react-aria';
import { ChevronsUpDownIcon, LoaderCircleIcon } from 'lucide-react';
import React from 'react';
import {
	ComboBox as AriaComboBox,
	ComboBoxProps as AriaComboBoxProps,
	ListBox,
	ListBoxItemProps,
	ValidationResult,
} from 'react-aria-components';

export interface ComboBoxProps<T extends object> extends Omit<AriaComboBoxProps<T>, 'children'> {
	label?: string;
	description?: string | null;
	errorMessage?: string | ((validation: ValidationResult) => string);
	children?: React.ReactNode | ((item: T) => React.ReactNode);
	isLoading?: boolean;
	placeholder?: string;
}

export const ComboBox = <T extends object>({
	label,
	description,
	errorMessage,
	children,
	items,
	isLoading,
	placeholder,
	...props
}: ComboBoxProps<T>) => {
	return (
		<AriaComboBox
			{...props}
			className={composeTailwindRenderProps(props.className, 'group flex flex-col gap-1')}
		>
			{label ? <Label>{label}</Label> : null}
			<FieldGroup>
				<Input placeholder={placeholder} />
				<Button
					size='xs'
					iconOnly
					variant='ghost'
					aria-label='Toggle'
					className='mr-1 outline-offset-0'
					isDisabled={isLoading}
				>
					{isLoading ? (
						<LoaderCircleIcon className='text-muted-foreground animate-spin' />
					) : (
						<ChevronsUpDownIcon
							aria-hidden
							className='text-muted-foreground text-sm'
						/>
					)}
				</Button>
			</FieldGroup>
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError>{errorMessage}</FieldError>
			<Popover className='w-(--trigger-width) p-0'>
				<ListBox
					items={items}
					className='max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]'
				>
					{children}
				</ListBox>
			</Popover>
		</AriaComboBox>
	);
};

export function ComboBoxItem(props: ListBoxItemProps) {
	return <DropdownItem {...props} />;
}

export function ComboBoxSection<T extends object>(props: DropdownSectionProps<T>) {
	return <DropdownSection {...props} />;
}

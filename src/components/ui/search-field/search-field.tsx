'use client';

import { SearchIcon, XIcon } from 'lucide-react';

import { composeTailwindRenderProps } from '@/utils/react-aria';
import {
	SearchField as AriaSearchField,
	SearchFieldProps as AriaSearchFieldProps,
	ValidationResult,
} from 'react-aria-components';
import { Button } from '../button';
import { FieldDescription, FieldError, FieldGroup, Input, Label } from '../field';

export interface SearchFieldProps extends AriaSearchFieldProps {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	placeholder?: string;
}

export const SearchField = ({ label, description, errorMessage, placeholder, ...props }: SearchFieldProps) => {
	return (
		<AriaSearchField
			{...props}
			className={composeTailwindRenderProps(props.className, 'group flex min-w-10 flex-col gap-1')}
		>
			{label && <Label>{label}</Label>}
			<FieldGroup>
				<SearchIcon
					aria-hidden
					className='text-accent-foreground ml-2'
				/>
				<Input
					placeholder={placeholder}
					className='[&::-webkit-search-cancel-button]:hidden'
				/>
				<Button
					className='mr-1 h-6 w-6 group-empty:invisible'
					variant='ghost'
					size='xs'
					iconOnly
				>
					<XIcon />
				</Button>
			</FieldGroup>
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError>{errorMessage}</FieldError>
		</AriaSearchField>
	);
};

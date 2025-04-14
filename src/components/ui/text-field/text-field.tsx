'use client';

import { SlotsToClasses } from '@/utils/types';
import {
	TextField as AriaTextField,
	TextFieldProps as AriaTextFieldProps,
	composeRenderProps,
	ValidationResult,
} from 'react-aria-components';
import { tv, VariantProps } from 'tailwind-variants';
import { FieldDescription, FieldError, Input, inputStyles, Label } from '../field';

const textFieldVariants = tv({
	slots: {
		root: 'flex flex-col gap-1',
		label: '',
		input: inputStyles({ className: 'focus:ring-ring bg-background focus:ring-1' }),
		description: '',
		error: '',
	},
});

export type TextFieldVariants = VariantProps<typeof textFieldVariants>;
export type TextFieldSlots = keyof ReturnType<typeof textFieldVariants>;
export type TextFieldClassNames = SlotsToClasses<TextFieldSlots>;

export interface TextFieldProps extends AriaTextFieldProps {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	classNames?: TextFieldClassNames;
	placeholder?: string;
}

export function TextField({ label, description, errorMessage, classNames, placeholder, ...props }: TextFieldProps) {
	const slots = textFieldVariants({});

	return (
		<AriaTextField
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				slots.root({ ...renderProps, className })
			)}
		>
			{label && <Label className={slots.label({ className: classNames?.label })}>{label}</Label>}
			<Input
				className={slots.input({ className: classNames?.input })}
				placeholder={placeholder}
			/>
			{description && (
				<FieldDescription className={slots.description({ className: classNames?.description })}>
					{description}
				</FieldDescription>
			)}
			<FieldError className={slots.error({ className: classNames?.error })}>{errorMessage}</FieldError>
		</AriaTextField>
	);
}

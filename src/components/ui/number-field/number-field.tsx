'use client';

import { SlotsToClasses } from '@/utils/types';
import { MinusIcon, PlusIcon } from 'lucide-react';
import {
	NumberField as AriaNumberField,
	NumberFieldProps as AriaNumberFieldProps,
	composeRenderProps,
	ValidationResult,
} from 'react-aria-components';
import { tv, VariantProps } from 'tailwind-variants';
import { Button } from '../button';
import { FieldDescription, FieldError, FieldGroup, Input, Label } from '../field';

const numberFieldVariants = tv({
	slots: {
		root: 'flex flex-col gap-1',
		label: '',
		fieldGroup: 'px-1',
		input: 'text-center',
		description: '',
		error: '',
	},
});

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>;
export type NumberFieldSlots = keyof ReturnType<typeof numberFieldVariants>;
export type NumberFieldClassNames = SlotsToClasses<NumberFieldSlots>;

export interface NumberFieldProps extends AriaNumberFieldProps, NumberFieldVariants {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	classNames?: NumberFieldClassNames;
	placeholder?: string;
	showControls?: boolean;
	inputRef?: React.Ref<HTMLInputElement>;
}

export const NumberField = ({
	label,
	description,
	errorMessage,
	classNames,
	placeholder,
	showControls,
	inputRef,
	...props
}: NumberFieldProps) => {
	const slots = numberFieldVariants({});

	return (
		<AriaNumberField
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				slots.root({ ...renderProps, className })
			)}
		>
			{label && <Label className={slots.label({ className: classNames?.label })}>{label}</Label>}
			<FieldGroup className={slots.fieldGroup({ className: classNames?.fieldGroup })}>
				{showControls ? (
					<Button
						size='xs'
						iconOnly
						variant='ghost'
						slot={'decrement'}
					>
						<MinusIcon />
					</Button>
				) : null}
				<Input
					ref={inputRef}
					className={slots.input({ className: classNames?.input })}
					placeholder={placeholder}
				/>
				{showControls ? (
					<Button
						size='xs'
						iconOnly
						variant='ghost'
						slot='increment'
					>
						<PlusIcon />
					</Button>
				) : null}
			</FieldGroup>
			{description && (
				<FieldDescription className={slots.description({ className: classNames?.description })}>
					{description}
				</FieldDescription>
			)}
			<FieldError className={slots.error({ className: classNames?.error })}>{errorMessage}</FieldError>
		</AriaNumberField>
	);
};

import { Separator as AriaSeparator, SeparatorProps } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const separatorVariants = tv({
	base: 'bg-border shrink-0',
	variants: {
		orientation: {
			horizontal: 'h-px w-full',
			vertical: 'h-full w-px',
		},
	},
	defaultVariants: {
		orientation: 'horizontal',
	},
});

export const Separator = ({ orientation, className, ...props }: SeparatorProps) => {
	return (
		<AriaSeparator
			className={separatorVariants({ orientation, className })}
			{...props}
		/>
	);
};

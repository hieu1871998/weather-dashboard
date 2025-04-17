import { cn } from '@/utils/cn';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuProps as AriaMenuProps,
	MenuSection as AriaMenuSection,
	MenuSectionProps as AriaMenuSectionProps,
	Collection,
	composeRenderProps,
	Header,
	MenuItemProps,
	Separator,
	SeparatorProps,
} from 'react-aria-components';
import { dropdownItemStyles } from '../list-box';
import { Popover, PopoverProps } from '../popover';

interface MenuProps<T> extends AriaMenuProps<T> {
	placement?: PopoverProps['placement'];
}

export const Menu = <T extends object>({ className, ...props }: MenuProps<T>) => {
	return (
		<Popover
			placement={props.placement}
			className={cn('w-auto min-w-40 p-0', className)}
		>
			<AriaMenu
				{...props}
				className='max-h-[inherit] overflow-auto p-1 outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]'
			/>
		</Popover>
	);
};

export const MenuItem = ({ className, textValue: textValueProp, children, ...props }: MenuItemProps) => {
	const textValue = textValueProp ?? (typeof children === 'string' ? children : undefined);

	return (
		<AriaMenuItem
			textValue={textValue}
			className={cn(dropdownItemStyles(), className)}
			{...props}
		>
			{composeRenderProps(children, (children, { selectionMode, isSelected, hasSubmenu }) => (
				<>
					{selectionMode !== 'none' && (
						<span className='flex w-4 items-center'>
							{isSelected && (
								<CheckIcon
									aria-hidden
									className='size-4'
								/>
							)}
						</span>
					)}
					{/* <span className='group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal'> */}
					{children}
					{/* </span> */}
					{hasSubmenu && (
						<ChevronRightIcon
							aria-hidden
							className='absolute right-2 size-4'
						/>
					)}
				</>
			))}
		</AriaMenuItem>
	);
};

export const MenuSeparator = (props: SeparatorProps) => {
	return (
		<Separator
			{...props}
			className='bg-border -mx-1 my-1 h-px'
		/>
	);
};

export interface MenuSectionProps<T> extends AriaMenuSectionProps<T> {
	title?: string;
	items?: Iterable<T>;
}

export const MenuSection = <T extends object>(props: MenuSectionProps<T>) => {
	return (
		<AriaMenuSection className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
			<Header className='bg-accent supports-[-moz-appearance:none]:bg-muted sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y px-2 py-1.5 text-sm font-semibold backdrop-blur-md [&+*]:mt-1'>
				{props.title}
			</Header>
			<Collection items={props.items}>{props.children}</Collection>
		</AriaMenuSection>
	);
};

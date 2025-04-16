'use client';

import { Button } from '@/components/ui/button';
import { NumberField } from '@/components/ui/number-field/number-field';
import { StorageKey } from '@/lib/constants';
import { Location } from '@/types/geocoding';
import { cn } from '@/utils/cn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useQueryStates } from 'nuqs';
import { useTransition } from 'react';
import { Form, FormProps } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { LocationSearch } from '../location-search';
import { filterParsers } from './filter-section.params';
import { FilterSchema, filterSchema } from './filter-section.schema';

export const FilterSection = ({ className, ...props }: FormProps) => {
	const [isPending, startTransition] = useTransition();

	const [filter, setFilter] = useQueryStates(filterParsers, {
		clearOnDefault: true,
		shallow: false,
		startTransition,
	});

	const [, setWidgetPayloads] = useLocalStorage<FilterSchema[]>(StorageKey.WeatherWidgetList, []);

	const {
		handleSubmit: onSubmit,
		setValue,
		control,
		getValues,
	} = useForm<FilterSchema>({
		resolver: zodResolver(filterSchema),
		defaultValues: {
			latitude: filter.latitude,
			longitude: filter.longitude,
			locationId: filter.locationId,
			forecastDays: filter.forecast_days,
		},
	});

	const handleLocationChange = (location: Location | null) => {
		if (location) {
			setValue('locationId', location.id);
			setValue('latitude', location.latitude);
			setValue('longitude', location.longitude);
		}
	};

	const handleSubmit = (values: FilterSchema) => {
		setFilter({
			latitude: values.latitude,
			longitude: values.longitude,
			locationId: values.locationId,
			forecast_days: values.forecastDays,
		});
	};

	const handleAddWidget = () => {
		const values = getValues();

		setWidgetPayloads(prev => {
			const ids = prev.map(item => item.locationId);

			if (ids.includes(values.locationId)) {
				return prev;
			}

			return [...prev, values];
		});
	};

	return (
		<Form
			className={cn('bg-background flex flex-col justify-between gap-2 rounded-xl border p-4', className)}
			onSubmit={onSubmit(handleSubmit)}
			{...props}
		>
			<div className='grid gap-2 2xl:grid-cols-3'>
				<LocationSearch
					label='Location'
					className='col-span-3'
					placeholder='Location'
					onChange={handleLocationChange}
				/>
				<Controller
					control={control}
					name='latitude'
					rules={{ required: 'Latitude is required.' }}
					render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
						<NumberField
							inputRef={ref}
							name={name}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							errorMessage={error?.message}
							minValue={-90}
							maxValue={90}
							step={0.1}
							validationBehavior='aria'
							isInvalid={invalid}
							label='Latitude'
							placeholder='Latitude'
						/>
					)}
				/>
				<Controller
					control={control}
					name='longitude'
					rules={{ required: 'Longitude is required.' }}
					render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
						<NumberField
							inputRef={ref}
							name={name}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							minValue={-180}
							maxValue={180}
							step={0.1}
							errorMessage={error?.message}
							validationBehavior='aria'
							isInvalid={invalid}
							label='Longitude'
							placeholder='Longitude'
						/>
					)}
				/>
				<Controller
					control={control}
					name='forecastDays'
					rules={{ required: 'Forecast days is required.' }}
					render={({ field: { name, value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
						<NumberField
							inputRef={ref}
							name={name}
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							errorMessage={error?.message}
							validationBehavior='aria'
							isInvalid={invalid}
							label='Days'
							placeholder='Days'
						/>
					)}
				/>
			</div>
			<div className='mx-auto grid w-full grid-cols-2 gap-3'>
				<Button
					type='submit'
					isLoading={isPending}
				>
					Update
				</Button>
				<Button
					variant='outline'
					onPress={handleAddWidget}
				>
					Add widget
				</Button>
			</div>
		</Form>
	);
};

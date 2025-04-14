'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';
import { TextField } from '@/components/ui/text-field';
import { useQueryStates } from 'nuqs';
import { LocationSearch } from '../location-search';
import { coordinatesParams } from '../location-search/location-search.params';

export const LocationSection = () => {
	const [coordinates] = useQueryStates(coordinatesParams);

	return (
		<form className='grid grid-cols-8 gap-4'>
			<LocationSearch
				aria-label='Location'
				className='col-span-4'
				placeholder='Location'
			/>
			<div className='col-span-2 grid grid-cols-2 gap-4'>
				<TextField
					aria-label='Latitude'
					placeholder='Latitude'
					value={coordinates.latitude?.toString()}
				/>
				<TextField
					aria-label='Longitude'
					placeholder='Longitude'
					value={coordinates.longitude?.toString()}
				/>
			</div>
			<Select
				aria-label='Timezone'
				placeholder='Timezone'
			>
				<SelectItem>Automatic</SelectItem>
				<SelectItem isDisabled>Standard Time</SelectItem>
				<SelectItem>GMT</SelectItem>
			</Select>
			<Button>Search</Button>
		</form>
	);
};

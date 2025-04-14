'use client';

import { Select, SelectItem } from '@/components/ui/select';
import { TextField } from '@/components/ui/text-field';
import { useQueryStates } from 'nuqs';
import { LocationSearch } from '../location-search';
import { coordinatesParams } from '../location-search/location-search.params';

export const Sidebar = () => {
	const [coordinates] = useQueryStates(coordinatesParams);

	return (
		<aside className='h-full w-80 border-r px-5 py-3'>
			<form className='flex flex-col gap-4'>
				<LocationSearch label='Location' />
				<div className='grid grid-cols-2 gap-4'>
					<TextField
						label='Latitude'
						value={coordinates.latitude?.toString()}
					/>
					<TextField
						label='Longitude'
						value={coordinates.longitude?.toString()}
					/>
				</div>
				<Select label='Timezone'>
					<SelectItem>Automatic</SelectItem>
					<SelectItem isDisabled>Standard Time</SelectItem>
					<SelectItem>GMT</SelectItem>
				</Select>
			</form>
		</aside>
	);
};

'use client';

import { ComboBox, ComboBoxItem, ComboBoxProps } from '@/components/ui/combobox';
import { getLocation } from '@/services/geocoding';
import { Location } from '@/types/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { useState } from 'react';
import { Key } from 'react-aria-components';
import { coordinatesParams } from './location-search.params';

interface LocationSearchProps extends ComboBoxProps<Location> {
	onChange?: (location: Location | null) => void;
}

export const LocationSearch = ({ onChange, ...props }: LocationSearchProps) => {
	const [, setCoordinates] = useQueryStates(coordinatesParams);

	const [search, setSearch] = useState('');

	const { data, isFetching } = useQuery({
		queryFn: () => getLocation({ name: search }),
		queryKey: ['location', search],
	});

	const locations = data?.results ?? [];

	const handleSelectionChange = (value: Key | null) => {
		if (value) {
			const selectedLocation = locations.find(location => location.id === value) ?? null;

			setCoordinates({ latitude: selectedLocation?.latitude, longitude: selectedLocation?.longitude });

			onChange?.(selectedLocation);

			return;
		}

		onChange?.(null);
	};

	return (
		<ComboBox
			menuTrigger='input'
			allowsEmptyCollection
			inputValue={search}
			onInputChange={setSearch}
			items={locations}
			isLoading={isFetching}
			onSelectionChange={handleSelectionChange}
			{...props}
		>
			{item => <ComboBoxItem>{item.name}</ComboBoxItem>}
		</ComboBox>
	);
};

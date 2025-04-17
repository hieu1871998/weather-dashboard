'use client';

import { ComboBox, ComboBoxItem, ComboBoxProps } from '@/components/ui/combobox';
import { getLocations } from '@/services/geocoding';
import { Location } from '@/types/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Key } from 'react-aria-components';

interface LocationSearchProps extends ComboBoxProps<Location> {
	onChange?: (location: Location | null) => void;
}

export const LocationSearch = ({ onChange, ...props }: LocationSearchProps) => {
	const [search, setSearch] = useState('');

	const { data, isFetching } = useQuery({
		queryFn: () => getLocations({ name: search }),
		queryKey: ['location', search],
		refetchOnWindowFocus: false,
	});

	const locations = data?.results ?? [];

	const handleSelectionChange = (value: Key | null) => {
		if (value) {
			const selectedLocation = locations.find(location => location.id === value) ?? null;

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

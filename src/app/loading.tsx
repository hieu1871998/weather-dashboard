import { LoaderCircleIcon } from 'lucide-react';

const Loading = () => {
	return (
		<main className='flex h-full w-full items-center justify-center'>
			<LoaderCircleIcon className='animate-spin text-5xl' />
		</main>
	);
};

export default Loading;

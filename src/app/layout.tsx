import { Header } from '@/components/core/header';
import { generalSans } from '@/fonts/general-sans';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Weather Dashboard',
	description: 'Stay updated with the latest weather forecasts and conditions.',
};

export const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html
			lang='en'
			className='h-full'
			suppressHydrationWarning
		>
			<body
				className={`${generalSans.variable} ${generalSans.className} ${geistMono.variable} flex h-full flex-col p-4 antialiased`}
			>
				<Providers>
					<Header />
					<div className='flex min-w-0 flex-1'>{children}</div>
					<ReactQueryDevtools />
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;

import { Header } from '@/components/core/header';
import { generalSans } from '@/fonts/general-sans';
import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Weather Report',
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
		>
			<body
				className={`${generalSans.variable} ${generalSans.className} ${geistMono.variable} flex h-full flex-col antialiased`}
			>
				<Providers>
					<Header />
					<div className='bg-accent flex min-w-0 flex-1'>
						{/* <Sidebar /> */}
						{children}
					</div>
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;

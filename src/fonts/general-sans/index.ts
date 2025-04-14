import localFont from 'next/font/local';

export const generalSans = localFont({
	src: [
		{
			path: './GeneralSans-Variable.woff2',
			style: 'normal',
			weight: '200 700',
		},
		{
			path: './GeneralSans-VariableItalic.woff2',
			style: 'italic',
			weight: '200 700',
		},
	],
	display: 'swap',
	variable: '--font-general-sans',
});

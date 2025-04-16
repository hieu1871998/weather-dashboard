import {
	CloudDrizzleIcon,
	CloudFogIcon,
	CloudIcon,
	CloudLightningIcon,
	CloudMoonIcon,
	CloudMoonRainIcon,
	CloudRainIcon,
	CloudRainWindIcon,
	CloudSnowIcon,
	CloudSunIcon,
	CloudSunRainIcon,
	MoonIcon,
	SnowflakeIcon,
	SunIcon,
} from 'lucide-react';

export const getIcon = (code?: number, is_day?: number) => {
	const isDay = is_day === 1;

	switch (code) {
		case 0:
		case 1:
			return isDay ? SunIcon : MoonIcon;
		case 2:
			return isDay ? CloudSunIcon : CloudMoonIcon;
		case 3:
			return CloudIcon;
		case 45:
		case 48:
			return CloudFogIcon;
		case 51:
			return CloudDrizzleIcon;
		case 53:
		case 55:
			return CloudRainIcon;
		case 56:
		case 57:
			return CloudMoonRainIcon;
		case 61:
		case 63:
		case 65:
			return CloudSunRainIcon;
		case 66:
		case 67:
			return CloudRainWindIcon;
		case 71:
		case 73:
		case 75:
			return SnowflakeIcon;
		case 77:
			return CloudSnowIcon;
		case 80:
		case 81:
		case 82:
			return CloudRainWindIcon;
		case 85:
		case 86:
			return SnowflakeIcon;
		case 95:
			return CloudLightningIcon;
		case 96:
		case 99:
			return CloudIcon;
		default:
			return SunIcon; // Fallback for any unknown weather codes
	}
};

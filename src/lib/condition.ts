export const getWeatherCondition = (code?: number): string => {
	switch (code) {
		// Clear / Sunny conditions
		case 0:
			return 'Sunny';
		case 1:
		case 2:
			return 'Mostly Sunny';
		case 3:
			return 'Partly Cloudy';

		// Hazy conditions
		case 4:
		case 5:
		case 6:
			return 'Hazy';

		// Dusty conditions
		case 7:
		case 8:
			return 'Dusty';
		case 9:
			return 'Duststorm';

		// Fog / Mist conditions (including the 40–49 fog range)
		case 10:
		case 11:
		case 12:
		case 40:
		case 41:
		case 42:
		case 43:
		case 44:
		case 45:
		case 46:
		case 47:
		case 48:
		case 49:
			return 'Fog';

		// Thunderstorm (or lightning) conditions
		case 13:
		case 17:
		case 29:
		case 91:
		case 95:
		case 96:
		case 97:
		case 98:
		case 99:
			return 'Thunderstorm';

		// Rain-related conditions
		// Codes 14,15,16 (precipitation within sight) and 21,24,25 + 60-67 (rain)
		case 14:
		case 15:
		case 16:
		case 21:
		case 24:
		case 25:
		case 60:
		case 61:
		case 62:
		case 63:
		case 64:
		case 65:
		case 66:
		case 67:
			return 'Rain';

		// Drizzle (codes that include 20 and 50–59)
		case 20:
		case 50:
		case 51:
		case 52:
		case 53:
		case 54:
		case 55:
		case 56:
		case 57:
		case 58:
		case 59:
			return 'Drizzle';

		// Snow-related conditions
		// Snow or mixed rain/snow may appear in both groups.
		case 22:
		case 23:
		case 26:
		case 70:
		case 71:
		case 72:
		case 73:
		case 74:
		case 75:
		case 76:
		case 77:
		case 78:
		case 79:
		case 85:
		case 86:
		case 93:
		case 94:
			return 'Snow';

		// Mixed rain/snow (codes 68, 69, 83, 84)
		case 68:
		case 69:
		case 83:
		case 84:
			return 'Rain/Snow';

		// Hail (and similar shower conditions)
		case 27:
		case 87:
		case 88:
		case 89:
		case 90:
			return 'Hail';

		// Windy / squalls
		case 18:
			return 'Windy';

		// Tornado / funnel cloud
		case 19:
			return 'Tornado';

		default:
			return 'Unknown';
	}
};

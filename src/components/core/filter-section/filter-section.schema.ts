import { z } from 'zod';

export const filterSchema = z.object({
	latitude: z.number(),
	longitude: z.number(),
	locationId: z.number(),
	forecastDays: z.number().min(1),
});

export type FilterSchema = z.infer<typeof filterSchema>;

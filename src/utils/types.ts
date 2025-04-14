import { type ClassValue } from 'tailwind-variants';

export type SlotsToClasses<S extends string> = Partial<Record<S, Exclude<ClassValue, 0n>>>;

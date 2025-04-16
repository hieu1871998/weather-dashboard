export const reorderArray = <T>(array: T[], from: number, to: number): T[] => {
	if (from === to) return array;

	const result = [...array];
	const [removed] = result.splice(from, 1);
	result.splice(to, 0, removed);

	return result;
};

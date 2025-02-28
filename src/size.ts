export const bit = 1;
export const kilobit = 1024 * bit;
export const megabit = 1024 * kilobit;
export const gigabit = 1024 * megabit;
export const terabit = 1024 * gigabit;

export const byte = 8 * bit;
export const kilobyte = 1024 * byte;
export const megabyte = 1024 * kilobyte;
export const gigabyte = 1024 * megabyte;
export const terabyte = 1024 * gigabyte;

const sizeUnitMap = {
	'b': bit,
	'B': byte,
	'kb': kilobit,
	'kB': kilobyte,
	'Mb': megabit,
	'MB': megabyte,
	'Gb': gigabit,
	'GB': gigabyte,
	'Tb': terabit,
	'TB': terabyte,
} as const

const keys = Object.keys(sizeUnitMap);

export type SizeUnit = keyof typeof sizeUnitMap;

export function getSizeByUnit(unit: SizeUnit): number {
	if (!keys.includes(unit)) {
		throw new Error(`Unknown size unit: ${unit}`);
	}

	return sizeUnitMap[unit];
}

export function size(value: number, unit: SizeUnit): number {
	return value * getSizeByUnit(unit);
}

const regex = new RegExp(`^(\\d+|NaN)(${keys.join('|')})$`);

export function commonly(value: `${number}${SizeUnit}`): number {
	const match = value.match(regex);

	if (!match) {
		throw new Error(`Invalid input format: ${value}`);
	}

	const [, numStr, unit] = match;
	const num = parseInt(numStr, 10);

	if (isNaN(num) || !keys.includes(unit as SizeUnit)) {
		throw new Error(`Invalid size value or unit: ${value}`);
	}

	return size(num, unit as SizeUnit);
}

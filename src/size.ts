
/**
 * Represents the size of one bit in bits.
 */
export const bit = 1;
/**
 * Represents the size of one kilobit in bits.
 * A kilobit is defined as 1024 bits.
 */
export const kilobit = 1024 * bit;
/**
 * Represents the size of one megabit in bits.
 * A megabit is defined as 1024 kilobits.
 */
export const megabit = 1024 * kilobit;
/**
 * Represents the size of one gigabit in bits.
 * A gigabit is defined as 1024 megabits.
 */
export const gigabit = 1024 * megabit;
/**
 * Represents the size of one terabit in bits.
 * A terabit is defined as 1024 gigabits.
 */
export const terabit = 1024 * gigabit;
/**
 * Represents the size of one byte in bits.
 * A byte is defined as 8 bits.
 * This is the same as 1 kilobyte.
 */
export const byte = 8 * bit;

/**
 * Represents the size of one kilobyte in bytes.
 * A kilobyte is defined as 1024 bytes.
 * This is the same as 8 kilobits.
 */
export const kilobyte = 1024 * byte;
/**
 * Represents the size of one megabyte in bytes.
 * A megabyte is defined as 1024 kilobytes.
 */
export const megabyte = 1024 * kilobyte;
/**
 * Represents the size of one gigabyte in bytes.
 * A gigabyte is defined as 1024 megabytes.
 */
export const gigabyte = 1024 * megabyte;
/**
 * Represents the size of one terabyte in bytes.
 * A terabyte is defined as 1024 gigabytes.
 */
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

/**
 * Converts a string value with a size unit into its numeric representation in bits.
 * 
 * @param value - A string containing a number followed by a size unit (e.g., "10MB").
 * @returns The numeric representation of the size in bits.
 * @throws Will throw an error if the input format is invalid or the size unit is unknown.
 */
export function commonly(value: `${number}${SizeUnit}`): number {
	const match = value.match(regex);

	if (!match) {
		throw new Error(`Invalid input format: ${value}`);
	}

	const [, numStr, unit] = match;
	const parsedValue = parseInt(numStr, 10);

	if (isNaN(parsedValue) || !keys.includes(unit as SizeUnit)) {
		throw new Error(`Invalid size value or unit: ${value}`);
	}

	return size(parsedValue, unit as SizeUnit);
}

import { describe, it, expect } from 'vitest';
import { getSizeByUnit, commonly } from './size';

describe('Size conversion utility functions', () => {
	it('should return correct size for valid units', () => {
		expect(getSizeByUnit('b')).toBe(1);
		expect(getSizeByUnit('B')).toBe(8);
		expect(getSizeByUnit('kb')).toBe(1024);
		expect(getSizeByUnit('kB')).toBe(1024 * 8);
		expect(getSizeByUnit('Mb')).toBe(1024 * 1024);
		expect(getSizeByUnit('MB')).toBe(1024 * 1024 * 8);
		expect(getSizeByUnit('Gb')).toBe(1024 * 1024 * 1024);
		expect(getSizeByUnit('GB')).toBe(1024 * 1024 * 1024 * 8);
		expect(getSizeByUnit('Tb')).toBe(1024 * 1024 * 1024 * 1024);
		expect(getSizeByUnit('TB')).toBe(1024 * 1024 * 1024 * 1024 * 8);
	});

	it('should throw an error for unknown units', () => {
		expect(() => getSizeByUnit('unknown' as any)).toThrow('Unknown size unit: unknown');
		// @ts-ignore
		expect(() => getSizeByUnit('')).toThrow('Unknown size unit: ');
	});

	it('should return correct size for valid inputs', () => {
		expect(commonly('1b')).toBe(1);
		expect(commonly('1B')).toBe(8);
		expect(commonly('1kb')).toBe(1024);
		expect(commonly('1kB')).toBe(1024 * 8);
		expect(commonly('1Mb')).toBe(1024 * 1024);
		expect(commonly('1MB')).toBe(1024 * 1024 * 8);
		expect(commonly('1Gb')).toBe(1024 * 1024 * 1024);
		expect(commonly('1GB')).toBe(1024 * 1024 * 1024 * 8);
		expect(commonly('1Tb')).toBe(1024 * 1024 * 1024 * 1024);
		expect(commonly('1TB')).toBe(1024 * 1024 * 1024 * 1024 * 8);
	});

	it('should throw an error for invalid input formats', () => {
		// @ts-ignore
		expect(() => commonly('1')).toThrow('Invalid input format: 1');
		// @ts-ignore
		expect(() => commonly('1unknown')).toThrow('Invalid input format: 1unknown');
		// @ts-ignore
		expect(() => commonly('')).toThrow('Invalid input format: ');
	});
	
	it('should throw an error for invalid size values or units', () => {
		// @ts-ignore
		expect(() => commonly('NaNb')).toThrow('Invalid size value or unit: NaNb');
	});
});
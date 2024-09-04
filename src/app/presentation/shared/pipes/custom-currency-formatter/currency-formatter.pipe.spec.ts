import { CurrencyFormatterPipe } from './currency-formatter.pipe';

describe('CurrencyFormatterPipe', () => {
  let pipe: CurrencyFormatterPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatterPipe();
  });

  it('should format a number with default parameters', () => {
    expect(pipe.transform(1234.56)).toBe('$ 1234.56');
  });

  it('should format a number with custom currency symbol', () => {
    expect(pipe.transform(1234.56, '€')).toBe('€ 1234.56');
  });

  it('should format a number with custom position for currency symbol', () => {
    expect(pipe.transform(1234.56, '$', 'after')).toBe('1234.56 $');
  });

  it('should handle string input and format correctly', () => {
    expect(pipe.transform('1234.56')).toBe('$ 1234.56');
  });

  it('should return "Unknown" for invalid number input', () => {
    expect(pipe.transform('invalid')).toBe('Unknown');
    expect(pipe.transform('')).toBe('Unknown');
  });

  it('should handle edge cases for numbers', () => {
    expect(pipe.transform(0)).toBe('$ 0.00');
    expect(pipe.transform(0, '£')).toBe('£ 0.00');
    expect(pipe.transform(0, '£', 'after')).toBe('0.00 £');
  });

  it('should handle numbers with very large values', () => {
    expect(pipe.transform(1234567890123.45)).toBe('$ 1234567890123.45');
  });

  it('should handle numbers with very small values', () => {
    expect(pipe.transform(0.0001)).toBe('$ 0.00');
  });

  it('should handle numbers with no decimal part correctly', () => {
    expect(pipe.transform(1000)).toBe('$ 1000.00');
  });
});

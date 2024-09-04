import { SpeedFormatterPipe } from './speed-formatter.pipe';

describe('SpeedFormatterPipe', () => {
  let pipe: SpeedFormatterPipe;

  beforeEach(() => {
    pipe = new SpeedFormatterPipe();
  });

  it('should format a number with default unit (km/h)', () => {
    expect(pipe.transform(1234.56)).toBe('1234.56 km/h');
  });

  it('should format a number with custom unit (mi/h)', () => {
    expect(pipe.transform(1234.56, 'mi/h')).toBe('1234.56 mi/h');
  });

  it('should handle string input and format correctly with default unit', () => {
    expect(pipe.transform('1234.56')).toBe('1234.56 km/h');
  });

  it('should handle string input and format correctly with custom unit', () => {
    expect(pipe.transform('1234.56', 'mi/h')).toBe('1234.56 mi/h');
  });

  it('should return an empty string for invalid number input', () => {
    expect(pipe.transform('invalid')).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('should handle edge cases for numbers', () => {
    expect(pipe.transform(0)).toBe('0.00 km/h');
    expect(pipe.transform(0, 'mi/h')).toBe('0.00 mi/h');
  });

  it('should handle numbers with very large values', () => {
    expect(pipe.transform(1234567890123.45)).toBe('1234567890123.45 km/h');
  });

  it('should handle numbers with very small values', () => {
    expect(pipe.transform(0.0001)).toBe('0.00 km/h');
  });

  it('should handle numbers with no decimal part correctly', () => {
    expect(pipe.transform(1000)).toBe('1000.00 km/h');
  });
});

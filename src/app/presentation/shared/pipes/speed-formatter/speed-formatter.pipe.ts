import { Pipe, PipeTransform } from '@angular/core';

/**
 * `SpeedFormatterPipe` is a custom Angular pipe that formats a given speed value with the specified unit.
 * It allows specifying the speed unit as either kilometers per hour (`km/h`) or miles per hour (`mi/h`).
 * 
 * @remarks
 * This pipe takes a speed value and formats it to two decimal places, appending the specified unit.
 * It handles string inputs by converting them to numbers and returns an empty string if the input cannot be parsed as a number.
 * 
 * @example
 * Example usage in a template:
 * ```html
 * {{ vehicle.speed | speedFormatter:'mi/h' }}
 * ```
 * 
 * This will format the speed as: `120.00 mi/h`.
 * 
 * @decorator `@Pipe`
 */
@Pipe({
  name: 'speedFormatter'
})
export class SpeedFormatterPipe implements PipeTransform {
  /**
   * Transforms the input speed value into a formatted string with the specified unit.
   * 
   * @param speed - The speed to format. It can be a number or a string. If it's a string, it will be parsed to a number.
   * @param unit - The speed unit to display, either `'km/h'` or `'mi/h'`. Defaults to `'km/h'`.
   * @returns A formatted speed string with two decimal places and the specified unit. If the input is invalid, it returns an empty string.
   */
  transform(
    speed: number | string, 
    unit: 'km/h' | 'mi/h' = 'km/h'
  ): string {
    if (typeof speed === 'string') {
      speed = parseFloat(speed);
    }
    
    if (isNaN(speed)) {
      return '';
    }
    
    const formattedSpeed = speed.toFixed(2);
    
    return `${formattedSpeed} ${unit}`;
  }
}

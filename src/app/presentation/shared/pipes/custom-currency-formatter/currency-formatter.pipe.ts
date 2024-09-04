import { Pipe, PipeTransform } from '@angular/core';

/**
 * `CurrencyFormatterPipe` is a custom Angular pipe that formats a given number or string into a currency format.
 * It allows specifying a currency symbol and the position of the symbol (either before or after the amount).
 * 
 * @remarks
 * This pipe takes an amount and formats it to two decimal places, adding the specified currency symbol.
 * It also handles string inputs by converting them to numbers and returns "Unknown" if the input cannot be parsed as a number.
 * 
 * @example
 * Example usage in a template:
 * ```html
 * {{ product.price | currencyFormatter:'€':'after' }}
 * ```
 * 
 * This will format the price as: `100.00 €`.
 * 
 * @decorator `@Pipe`
 */
@Pipe({
  name: 'currencyFormatter'
})
export class CurrencyFormatterPipe implements PipeTransform {
  /**
   * Transforms the input amount into a formatted currency string.
   * 
   * @param amount - The amount to format. It can be a number or a string. If it's a string, it will be parsed to a number.
   * @param currencySymbol - The currency symbol to display. Defaults to `'$'`.
   * @param position - Specifies the position of the currency symbol, either before or after the amount. Defaults to `'before'`.
   * @returns A formatted currency string with two decimal places. If the input is invalid, it returns `'Unknown'`.
   */
  transform(
    amount: number | string, 
    currencySymbol: string = '$', 
    position: 'before' | 'after' = 'before'
  ): string {
    if (typeof amount === 'string') {
      amount = parseFloat(amount);
    }

    if (isNaN(amount)) {
      return 'Unknown';
    }
    
    const formattedAmount = amount.toFixed(2);
    
    return position === 'before'
      ? `${currencySymbol} ${formattedAmount}`
      : `${formattedAmount} ${currencySymbol}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter'
})
export class CurrencyFormatterPipe implements PipeTransform {
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

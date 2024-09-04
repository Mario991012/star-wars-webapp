import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter'
})
export class CurrencyFormatterPipe implements PipeTransform {
  transform(
    amount: number | string, 
    currencySymbol: string = '$', 
    position: 'before' | 'after' = 'before', 
    useCommas: boolean = false
  ): string {
    if (typeof amount === 'string') {
      amount = parseFloat(amount);
    }
    
    if (isNaN(amount)) {
      return '';
    }
    
    const formattedAmount = useCommas 
      ? this.formatWithCommas(amount.toFixed(2).toString())
      : amount.toFixed(2);
    
    return position === 'before'
      ? `${currencySymbol} ${formattedAmount}`
      : `${formattedAmount} ${currencySymbol}`;
  }

  private formatWithCommas(amount: string): string {
    const [integerPart, decimalPart] = amount.split('.');
    const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${withCommas}.${decimalPart}` : withCommas;
  }
}

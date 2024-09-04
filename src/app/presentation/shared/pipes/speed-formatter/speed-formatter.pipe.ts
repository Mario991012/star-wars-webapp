import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speedFormatter'
})
export class SpeedFormatterPipe implements PipeTransform {
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

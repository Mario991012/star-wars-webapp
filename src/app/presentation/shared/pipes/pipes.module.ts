import { NgModule } from '@angular/core';
import { CurrencyFormatterPipe } from './custom-currency-formatter/currency-formatter.pipe';
import { SpeedFormatterPipe } from './speed-formatter/speed-formatter.pipe';

@NgModule({
  declarations: [CurrencyFormatterPipe, SpeedFormatterPipe],
  exports: [CurrencyFormatterPipe, SpeedFormatterPipe]
})
export class PipesModule { }

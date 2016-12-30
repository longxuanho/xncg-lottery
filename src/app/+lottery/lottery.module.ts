import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LotteryRoutingModule, routedComponents } from './lottery-routing.module';
import { NumberService } from './shared/number.service';


@NgModule({
  imports: [
    SharedModule,
    LotteryRoutingModule
  ],
  providers: [
    NumberService
  ],
  declarations: [routedComponents]
})
export class LotteryModule { }

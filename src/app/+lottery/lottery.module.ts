import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LotteryRoutingModule, routedComponents } from './lottery-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LotteryRoutingModule
  ],
  declarations: [routedComponents]
})
export class LotteryModule { }

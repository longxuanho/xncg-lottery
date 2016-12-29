import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LotteryRoutingModule, routedComponents } from './lottery-routing.module';
import { LotteryResultListPreviewComponent } from './lottery-result-list-preview/lottery-result-list-preview.component';
import { LotteryNumberSlotsComponent } from './lottery-number-slots/lottery-number-slots.component';

@NgModule({
  imports: [
    SharedModule,
    LotteryRoutingModule
  ],
  declarations: [routedComponents, LotteryResultListPreviewComponent, LotteryNumberSlotsComponent]
})
export class LotteryModule { }

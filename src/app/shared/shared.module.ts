import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LotteryNumberSlotsComponent } from './lottery-number-slots/lottery-number-slots.component';
import { LotteryResultListPreviewComponent } from './lottery-result-list-preview/lottery-result-list-preview.component';


@NgModule({
  imports: [CommonModule],
  declarations: [
    LotteryNumberSlotsComponent,
    LotteryResultListPreviewComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LotteryNumberSlotsComponent,
    LotteryResultListPreviewComponent
  ]
})
export class SharedModule { }
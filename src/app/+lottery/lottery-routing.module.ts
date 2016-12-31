import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LotteryComponent } from './lottery.component';
import { LotteryResultListPreviewComponent } from './lottery-result-list-preview/lottery-result-list-preview.component';
import { LotteryNumberSlotsComponent } from './lottery-number-slots/lottery-number-slots.component';
import { LotteryNumberDigitComponent } from './lottery-number-digit/lottery-number-digit.component';
import { LotteryControlsComponent } from './lottery-controls/lottery-controls.component';


const routes: Routes = [
    {
        path: '',
        component: LotteryComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LotteryRoutingModule { }

export const routedComponents = [
    LotteryComponent,
    LotteryResultListPreviewComponent,
    LotteryNumberSlotsComponent,
    LotteryNumberDigitComponent,
    LotteryControlsComponent
];
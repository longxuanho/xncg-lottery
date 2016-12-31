import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardNumberSlotsComponent } from './dashboard-number-slots/dashboard-number-slots.component';
import { DashboardNumberDigitComponent } from './dashboard-number-digit/dashboard-number-digit.component';
import { DashboardResultListPreviewComponent } from './dashboard-result-list-preview/dashboard-result-list-preview.component';

const routes: Routes = [
    { 
        path: 'bang-tin', 
        component: DashboardComponent,
        // children: []
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}

export const routedComponents = [
    DashboardComponent, DashboardNumberSlotsComponent, DashboardNumberDigitComponent, DashboardResultListPreviewComponent
]
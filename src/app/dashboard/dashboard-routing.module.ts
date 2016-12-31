import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardResultListPreviewComponent } from './dashboard-result-list-preview/dashboard-result-list-preview.component';
import { DashboardResultsComponent } from './dashboard-results/dashboard-results.component';


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
    DashboardComponent, DashboardResultListPreviewComponent, DashboardResultsComponent
]
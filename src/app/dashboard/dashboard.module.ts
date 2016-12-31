import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { DashboardHeadingComponent } from './dashboard-heading/dashboard-heading.component';


@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [routedComponents, DashboardHeadingComponent]
})
export class DashboardModule { }

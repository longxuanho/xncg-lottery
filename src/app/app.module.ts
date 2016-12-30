import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { ResultService } from './shared/result.service';

@NgModule({
  
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    DashboardModule
  ],
  declarations: [
    AppComponent,
    routableComponents    
  ],
  providers: [
    ResultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

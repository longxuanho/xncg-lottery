import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import { firebaseConfig, firebaseAuthConfig } from './shared/core.config';
import { ToastrModule } from 'toastr-ng2';
import { throwIfAlreadyLoaded } from './shared/module-import-guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './shared/auth.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ progressBar: false }),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
    NavbarComponent,
  ],
  providers: [
    AuthService
  ],
  exports: [
    ToastrModule,
    AngularFireModule
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

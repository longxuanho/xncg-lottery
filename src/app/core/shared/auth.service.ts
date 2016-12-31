import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { ToastrService } from 'toastr-ng2';
import { Credential } from './auth.model';

@Injectable()
export class AuthService {

  auth: { data: FirebaseAuthState } = {
    data: null
  };

  constructor(
    private af: AngularFire,
    private toastrService: ToastrService
  ) {
    this.af.auth.subscribe(auth => {
      this.auth.data = (!!auth) ? auth : null;
    });
  }

  getAuth() {
    return this.auth;
  }

  syncAuth() {
    return this.af.auth;
  }

  isAuth() {
    return !!this.auth.data;
  }

  login(credential: Credential) {
    return new Promise<FirebaseAuthState>((resolve, reject) => {
      this.af.auth.login({
        email: credential.email,
        password: credential.password
      })
        .then((success: FirebaseAuthState) => resolve(success))
        .catch((error: Error) => reject(`Đăng nhập thất bại. ${error.message}`));
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.af.auth.logout();
      resolve();
    });    
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../shared/auth.service';
import { emailValidatePattern } from '../shared/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  subscriptions: { auth?: Subscription } = {}

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern(emailValidatePattern)
      ]],
      password: ['', Validators.required],
      rememberMe: [true]
    });
    this.subscriptions.auth = this.authService.syncAuth().subscribe(auth => {
      console.log(auth)
      if (auth && auth.uid) 
        this.router.navigate(['/quay-so']);
    })
  }

  ngOnDestroy() {
    this.subscriptions.auth.unsubscribe();
  }

  onLogIn(): void {
    this.authService.login(Object.assign({}, this.loginForm.value)).then(
      (success) => {
        this.loginForm.reset();
        this.toastrService.success('Welcome back!', 'Đăng nhập thành công');
        // this.router.navigate(['/quay-so']);
      }
    ).catch((error: string) => this.toastrService.error(error, 'Opps!'));
  }
}

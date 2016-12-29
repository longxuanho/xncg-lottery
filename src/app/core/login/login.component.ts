import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';

import { AuthService } from '../shared/auth.service';
import { emailValidatePattern } from '../shared/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
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
  }

  onLogIn(): void {
    this.authService.login(Object.assign({}, this.loginForm.value)).then(
      (success) => {
        this.loginForm.reset();
        this.toastrService.success('Welcome back!', 'Đăng nhập thành công');
      }
    ).catch((error: string) => this.toastrService.error(error, 'Opps!'));
  }
}

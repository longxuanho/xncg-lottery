import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  onLogout(event) {
    event.preventDefault();
    this.authService.logout();
    this.toastrService.info('Bạn đã đăng xuất khỏi hệ thống', 'Bye : )');
    this.router.navigate(['/dang-nhap']);
  }

  ngOnInit() {
  }

}

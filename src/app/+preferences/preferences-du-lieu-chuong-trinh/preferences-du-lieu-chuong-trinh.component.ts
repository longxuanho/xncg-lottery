import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/shared/auth.service';
import { LotterySettingsService }  from '../../shared/lottery-settings.service';
import { LotterySettings, defaultLotterySettings }  from '../../shared/lottery-settings.model';
import { ResultService }  from '../../shared/result.service';

import { ToastrService } from 'toastr-ng2';


@Component({
  selector: 'app-preferences-du-lieu-chuong-trinh',
  templateUrl: './preferences-du-lieu-chuong-trinh.component.html',
  styleUrls: ['./preferences-du-lieu-chuong-trinh.component.scss']
})
export class PreferencesDuLieuChuongTrinhComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private lotterySettingsService: LotterySettingsService,
    private resultService: ResultService,
    private toastrService: ToastrService
  ) { }

  resetResults() {
    this.lotterySettingsService.patchSettings({ displayCurrentSlot: 0 })
      .then(success => this.resultService.resetResults())
      .then(success => this.toastrService.success('Tất cả dữ liệu quay số đã được reset.', 'Reset thành công'))
      .catch(error => this.toastrService.success(`Có lỗi xảy ra khi reset dữ liệu quay số. ${error.message}`, 'Reset thất bại'));
    
  }

  generateUserPreferences() {
    this.lotterySettingsService.setSettings(defaultLotterySettings)
      .then(success => this.toastrService.success('Cấu hình của bạn đã được khởi tạo thành công', 'Tạo mới thành công'))
      .catch(error => this.toastrService.success(`Có lỗi xảy ra khi khởi tạo cấu hình ${error.message}`, 'Tạo mới thất bại'));
  }

  ngOnInit() {
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { Subscription } from 'rxjs/Subscription';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';

declare var screenfull: any;

@Component({
  selector: 'app-preferences-thong-tin-hien-thi',
  templateUrl: './preferences-thong-tin-hien-thi.component.html',
  styleUrls: ['./preferences-thong-tin-hien-thi.component.scss']
})
export class PreferencesThongTinHienThiComponent implements OnInit, OnDestroy {

  thongTinHienThiForm: FormGroup;
  submitting: boolean = false;
  subscriptions: {
    lotterySettings?: Subscription,
  } = {}
  cloneLotterySettings: LotterySettings;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private lotterySettingsService: LotterySettingsService,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.thongTinHienThiForm = this.formBuilder.group({
      displayMainTitle: this.formBuilder.control(''),
      displaySubtitle: this.formBuilder.control(''),
      displayHostName: this.formBuilder.control(''),
      displayBackgroundImage: this.formBuilder.control(''),
      displayThongTinGiaiThuong: this.formBuilder.control(false),
      displayThongTinGiaiThuong_GiaiNhat: this.formBuilder.control(''),
      displayThongTinGiaiThuong_GiaiNhi: this.formBuilder.control(''),
      displayThongTinGiaiThuong_GiaiBa: this.formBuilder.control(''),
    })
  }  

  onSubmit() {
    this.submitting = true;
    let rawData = Object.assign(this.thongTinHienThiForm.value);
    this.lotterySettingsService.patchSettings(rawData)
        .then(success => {
          this.submitting = false;
          this.toastrService.success('Thông tin của bạn đã được cập nhật vào hệ thống', 'Cập nhật thành công');
        })
        .catch(error => {
          this.submitting = false;
          this.toastrService.error('Cập nhật thông tin người dùng thất bại', 'Opps!');
        });
  }

  toggleFullScreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
    } else {
      this.toastrService.error('Xin lỗi, thiết bị của bạn không hỗ trợ chế độ Fullscreen.', 'Opps!');
    }
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
        (settings: LotterySettings) => {
          this.cloneLotterySettings = settings;
          if (settings)
            this.thongTinHienThiForm.patchValue(settings);
        },
      error => this.handleError(error));    
  }

  ngOnDestroy() {
    this.subscriptions.lotterySettings.unsubscribe();
  }

}

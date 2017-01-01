import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'toastr-ng2';
import { Subscription } from 'rxjs/Subscription';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';

@Component({
  selector: 'app-preferences-thuat-toan',
  templateUrl: './preferences-thuat-toan.component.html',
  styleUrls: ['./preferences-thuat-toan.component.scss']
})
export class PreferencesThuatToanComponent implements OnInit {

  thuatToanForm: FormGroup;
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
    this.thuatToanForm = this.formBuilder.group({
      numberRandomMin: this.formBuilder.control(''),
      numberRandomMax: this.formBuilder.control('')
    })
  }
  
  onSubmit() {
    this.submitting = true;
    let rawData = Object.assign(this.thuatToanForm.value);
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

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
        (settings: LotterySettings) => {
          this.cloneLotterySettings = settings;
          this.thuatToanForm.patchValue(settings);
        },
        error => this.handleError(error));
  }

  ngOnDestroy() {
    this.subscriptions.lotterySettings.unsubscribe();
  }

}

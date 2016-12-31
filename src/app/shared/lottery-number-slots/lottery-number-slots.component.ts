import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';
import { NumberService } from '../../shared/number.service';
import { AnimateDigit } from '../../shared/number.model'
import { ToastrService } from 'toastr-ng2';
import { DataFlowService } from '../../core/shared/data-flow.service';
import { ResultService } from '../../shared/result.service';
import { Result } from '../result.model';


@Component({
  selector: 'app-lottery-number-slots',
  templateUrl: './lottery-number-slots.component.html',
  styleUrls: ['./lottery-number-slots.component.scss']
})
export class LotteryNumberSlotsComponent implements OnInit, OnDestroy {

  subscriptions: {
    lotterySettings?: Subscription,
    dataFlow?: Subscription
  } = {}
  lotterySettings: LotterySettings;
  currentSlot: { firstDigit: AnimateDigit, secondDigit: AnimateDigit };

  firstDigit: number = 0;
  secondDigit: number = 0;
  targetFirstDigit: number;
  targetSecondDigit: number;
  animateSpeed: number = 500;

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private numberService: NumberService,
    private toastrService: ToastrService,
    private dataFlowService: DataFlowService,
    private resultService: ResultService,

  ) {
    this.subscriptions.dataFlow = this.dataFlowService.numberGenerated$
      .subscribe((result: Result) => {
        this.currentSlot = this.numberService.resolveNumberDigits(result.number);
        this.animateFirstDigit(this.currentSlot.firstDigit)
          .then(success => this.animateSecondDigit(this.currentSlot.secondDigit))
          // Sau khi animate xong -> đẩy dữ liệu lên server để đồng bộ
          .then(success => this.resultService.addNewResult(result))
          .then(success => this.lotterySettingsService.setCurrentSlot(result.number))
          .catch((error: Error) => this.handleError(error));
      })
  }

  animateFirstDigit(animateObject: AnimateDigit) {
    return new Promise((resolve, reject) => {
      let elapsedTime = 0;
      let timer = setInterval(() => {
        elapsedTime = elapsedTime + this.animateSpeed;
        if (this.firstDigit >= 9)
          this.firstDigit = 0;
        else
          this.firstDigit++;
        if (elapsedTime >= animateObject.minAnimanateTime && this.firstDigit === animateObject.targetDigit) {
          clearInterval(timer);
          resolve()
        }
      }, this.animateSpeed);
    });
  }

  animateSecondDigit(animateObject: AnimateDigit) {
    return new Promise((resolve, reject) => {
      let elapsedTime = 0;
      let timer = setInterval(() => {
        elapsedTime = elapsedTime + this.animateSpeed;
        if (this.secondDigit >= 9)
          this.secondDigit = 0;
        else
          this.secondDigit++;
        if (elapsedTime >= animateObject.minAnimanateTime && this.secondDigit === animateObject.targetDigit) {
          clearInterval(timer);
          resolve()
        }
      }, this.animateSpeed);
    });
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
        (value: LotterySettings) => this.lotterySettings = value,
        error => this.handleError(error)
      );
  }

  ngOnDestroy() {
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.dataFlow.unsubscribe();
  }

}

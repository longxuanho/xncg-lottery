import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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

  @Input() listener: boolean        // Nếu listener là true -> widget được sử dụng và đồng bộ tại +dashboard, ta phải subscribe một sự kiện khác trong ctor

  subscriptions: {
    lotterySettings?: Subscription,
    dataFlow?: Subscription,
  } = {}
  lotterySettings: LotterySettings;
  currentSlot: { firstDigit: AnimateDigit, secondDigit: AnimateDigit };

  firstDigit: number = 0;
  secondDigit: number = 0;
  animateSpeed: number = 500;

  hasNeonEffect1: boolean = false;
  hasNeonEffect2: boolean = false;
  neonEffectDuration: number = 6000;

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private numberService: NumberService,
    private toastrService: ToastrService,
    private dataFlowService: DataFlowService,
    private resultService: ResultService,

  ) {
    // Nếu widget này được dùng trong module +Lottery
    if (!this.listener) {           
      this.subscriptions.dataFlow = this.dataFlowService.numberGenerated$
        .subscribe((result: Result) => {
          this.currentSlot = this.numberService.resolveNumberDigits(result.number);
          this.animateFirstDigit(this.currentSlot.firstDigit)
            .then(success => {
              this.glowAfterAnimateFirstDigit();
              return this.animateSecondDigit(this.currentSlot.secondDigit);
            })
            // Sau khi animate xong -> đẩy dữ liệu lên server để đồng bộ
            .then(success => {
              this.glowAfterAnimateSecondDigit();
              return this.resultService.addNewResult(result)
            })
            // Sau khi đồng bộ trên server xong, phát tín hiệu tới Lottery-control để cho phép nút (Bắt đầu) được mở trở lại
            .then(success => {
              this.dataFlowService.animatedNumber(result);
            })
            .catch((error: Error) => {
              this.dataFlowService.animatedNumber(result);
              this.handleError(error)
            });
        })
    }
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

  glowAfterAnimateFirstDigit() {
    // Sau khi animate xong digit 1 -> bật hiệu ứng neon cho digit 1
    this.hasNeonEffect1 = true;
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

  glowAfterAnimateSecondDigit() {
    // Sau khi animate xong digit 2 -> bật hiệu ứng neon cho digit 2, delay một khoảng thời gian rồi tắt hiệu ứng cả digit 1 và 2
    this.hasNeonEffect2 = true;
    setTimeout(() => {
      this.hasNeonEffect2 = false;
      this.hasNeonEffect1 = false;
    }, this.neonEffectDuration);
  }

  handleError(error: Error) {
    // console.log(`${error.message}: ${error.stack}`);
    // this.toastrService.warning(error.message, 'Ngắt kết nối tới server...');
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.dataFlow.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
        (value: LotterySettings) => {
          if (this.lotterySettings && this.lotterySettings.displayCurrentSlot !== value.displayCurrentSlot) {
            // Nếu widget này được dùng trong module Dashboard -> check để cập nhật animation
            if (this.listener) {
              
              this.currentSlot = this.numberService.resolveNumberDigits(value.displayCurrentSlot);
              this.animateFirstDigit(this.currentSlot.firstDigit)
                .then(success => {
                  this.glowAfterAnimateFirstDigit();
                  return this.animateSecondDigit(this.currentSlot.secondDigit);
                })
                .then(success =>this.glowAfterAnimateSecondDigit())
                .catch((error: Error) => this.handleError(error));

            }
          }
          this.lotterySettings = value
        },
        error => this.handleError(error)
      );
  }

  ngOnDestroy() {
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.dataFlow.unsubscribe();
  }

}

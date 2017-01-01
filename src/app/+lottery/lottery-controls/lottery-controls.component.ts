import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';

import { ToastrService } from 'toastr-ng2';
import { NumberService } from '../../shared/number.service';
import { Result, Prizes } from '../../shared/result.model';
import { ResultService } from '../../shared/result.service';
import { DataFlowService } from '../../core/shared/data-flow.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-lottery-controls',
  templateUrl: './lottery-controls.component.html',
  styleUrls: ['./lottery-controls.component.scss']
})
export class LotteryControlsComponent implements OnInit, OnDestroy {

  newResult: Result;
  resultNumbers: number[] = [];
  submitting: boolean;
  currentPrizeText: string;
  lotterySettings: LotterySettings;


  subscriptions: {
    lotterySettings?: Subscription,
    results?: Subscription,
    dataFlow?: Subscription
  } = {}

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private toastrService: ToastrService,
    private resultService: ResultService,
    private numberService: NumberService,
    private dataFlowService: DataFlowService
  ) { 
    this.subscriptions.dataFlow = this.dataFlowService.numberAnimated$
      .subscribe((result: Result) => {
        // Sau khi dữ liệu đi từ control này -> lottery-slots để animate và cập nhật -> trở lại control này, ta mở khóa nút (Bắt đầu)
        this.submitting = false;
      });
  }

  setCurrentPrize(event: Event, value: number) {
    event.preventDefault();
    this.lotterySettingsService.setCurrentPrize(value);
  }

  onSubmit() {
    // Khóa nút (Bắt đầu) cho tới khi hoàn thành data flow
    this.submitting = true;
    this.numberService.generateWinningNumber({ min: this.lotterySettings.numberRandomMin, max: this.lotterySettings.numberRandomMax, forbiddenValue: this.resultNumbers }).
      then(number => {
        this.newResult = {
          prize: this.lotterySettings.displayCurrentPrize,
          number: number
        }
        // Cập nhật currentSlot Setting và forward result tới lottery-number-slots để animate trước khi lưu
        this.preAddNewResult(this.newResult);
      })
      .catch((error: Error) => this.toastrService.error(error.message));
  }

  preAddNewResult(result: Result) {
    this.lotterySettingsService.setCurrentSlot(result.number)
      .then((success) => this.dataFlowService.generatedNumber(result));    
  }

  handleError(error: Error) {
    // console.log(`${error.message}: ${error.stack}`);
    // this.toastrService.warning(error.message, 'Ngắt kết nối từ server...');
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.results.unsubscribe();
    this.subscriptions.dataFlow.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
      (value: LotterySettings) => {
        this.lotterySettings = value;
        if (this.lotterySettings)
          this.currentPrizeText = this.resultService.resolvePrizeText(this.lotterySettings.displayCurrentPrize);
      },
      error => this.handleError(error));
    this.subscriptions.results = this.resultService.getResults()
      .subscribe(
      (results: Result[]) => {
        if (results)
          this.resultNumbers = _.uniq(_.map(results, (result) => result.number))
      })
  }

  ngOnDestroy() {
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.results.unsubscribe();
    this.subscriptions.dataFlow.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';

import { ToastrService } from 'toastr-ng2';
import { NumberService } from '../../shared/number.service';
import { Result, Prizes } from '../../shared/result.model';
import { ResultService } from '../../shared/result.service';

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
    results?: Subscription
  } = {}

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private toastrService: ToastrService,
    private resultService: ResultService,
    private numberService: NumberService
  ) { }

  setCurrentPrize(event: Event, value: number) {
    event.preventDefault();
    this.lotterySettingsService.setCurrentPrize(value);
  }

  onSubmit() {
    this.numberService.generateWinningNumber({ min: this.lotterySettings.numberRandomMin, max: this.lotterySettings.numberRandomMax, forbiddenValue: this.resultNumbers }).
      then(number => {
        this.newResult = {
          prize: this.lotterySettings.displayCurrentPrize,
          number: number
        }
        this.addNewResult(this.newResult);
      })
      .catch((error: Error) => this.toastrService.error(error.message));
  }

  addNewResult(newResult: Result) {
    this.resultService.addNewResult(newResult)
      .then(success => this.lotterySettingsService.setCurrentSlot(newResult.number))
      .catch((error: Error) => this.handleError(error));
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
      value => {
        this.lotterySettings = value;
        this.currentPrizeText = this.resultService.resolvePrizeText(this.lotterySettings.displayCurrentPrize);
      },
      error => this.handleError(error));
    this.subscriptions.results = this.resultService.getResults()
      .subscribe(
      (results: Result[]) => this.resultNumbers = _.uniq(_.map(results, (result) => result.number)))
  }

  ngOnDestroy() {
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.results.unsubscribe();
  }

}

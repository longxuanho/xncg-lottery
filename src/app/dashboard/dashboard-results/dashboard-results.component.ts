import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';

import { ToastrService } from 'toastr-ng2';
import { Result, Prizes } from '../../shared/result.model';
import { ResultService } from '../../shared/result.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-results',
  templateUrl: './dashboard-results.component.html',
  styleUrls: ['./dashboard-results.component.scss']
})
export class DashboardResultsComponent implements OnInit, OnDestroy {

  results: { [key: string]: Result[] } = {};
  hasResult: boolean = false;
  lotterySettings: LotterySettings;
  subscriptions: {
    results?: Subscription,
    lotterySettings?: Subscription
  } = { }

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private toastrService: ToastrService,
    private resultService: ResultService,
  ) { }

  handleError(error: Error) {
    // console.log(`${error.message}: ${error.stack}`);
    // this.toastrService.warning(error.message, 'Ngắt kết nối tới server...');
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.results.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
        (value: LotterySettings) => this.lotterySettings = value,
        error => this.handleError(error));
    this.subscriptions.results = this.resultService.getResults()
      .subscribe(
        (results: Result[]) => {
          if (results && results.length) {
            this.results = _.groupBy(results, 'prize');
            this.hasResult = true;
          } else {
            this.results = {};
            this.hasResult = false;
          }            
        },
        (errors: Error) => this.handleError(errors)
      );
  }

  ngOnDestroy() {
    this.subscriptions.lotterySettings.unsubscribe();
    this.subscriptions.results.unsubscribe();
  }

}

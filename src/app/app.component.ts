import { Component, OnInit, OnDestroy } from '@angular/core';
import { LotterySettingsService } from './shared/lottery-settings.service';
import { ResultService } from './shared/result.service';

import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscriptions: {
    settings?: Subscription,
    results?: Subscription
  } = {}

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private resultService: ResultService
  ) { }

  ngOnInit() {
    this.subscriptions.settings = this.lotterySettingsService.syncSettings();
    this.subscriptions.results = this.resultService.syncCurrentResults();
  }

  ngOnDestroy() {
    this.subscriptions.settings.unsubscribe();
    this.subscriptions.results.unsubscribe();
  }
}

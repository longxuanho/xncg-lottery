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

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private resultService: ResultService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}

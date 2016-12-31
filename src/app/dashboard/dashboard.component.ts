import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LotterySettingsService } from '../shared/lottery-settings.service';
import { LotterySettings } from '../shared/lottery-settings.model';
import { ResultService } from '../shared/result.service';
import { Result, Prizes } from '../shared/result.model';
import { ToastrService } from 'toastr-ng2';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  lotterySettings: LotterySettings;
  subscriptions: {
    lotterySettings?: Subscription,
  } = {}
  currentPrizeText: string;

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private resultService: ResultService,
    private toastrService: ToastrService,
  ) { }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {  
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
        (value: LotterySettings) => {
          this.lotterySettings = value;
          this.currentPrizeText = this.resultService.resolvePrizeText(this.lotterySettings.displayCurrentPrize);
        },
        error => this.handleError(error));  
  }

  ngAfterViewInit() {
    $('body').addClass('has-background-image');
  }


  ngOnDestroy() {
    $('body').removeClass('has-background-image');
  }

}

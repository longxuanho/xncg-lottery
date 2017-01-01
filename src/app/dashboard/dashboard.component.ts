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
    // console.log(`${error.message}: ${error.stack}`);
    // this.toastrService.error(error.message, 'Ngắt kết nối tới server...');
    this.subscriptions.lotterySettings.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
      (value: LotterySettings) => {
        this.lotterySettings = value;
        if (this.lotterySettings) {
          $('body').removeClass('has-background-image-1 has-background-image-2 has-background-image-3 has-background-image-4 has-background-image-5');
          $('body').addClass(this.lotterySettings.displayBackgroundImage);
          this.currentPrizeText = this.resultService.resolvePrizeText(this.lotterySettings.displayCurrentPrize);
        }

      },
      error => this.handleError(error));
  }

  ngAfterViewInit() {
    // if (this.lotterySettings)
    //   $('body').addClass(this.lotterySettings.displayBackgroundImage);
  }


  ngOnDestroy() {
    if (this.lotterySettings)
      $('body').removeClass('has-background-image-1 has-background-image-2 has-background-image-3 has-background-image-4 has-background-image-5');
    this.subscriptions.lotterySettings.unsubscribe();
  }

}

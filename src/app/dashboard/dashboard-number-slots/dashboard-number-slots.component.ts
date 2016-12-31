import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';
import { NumberService } from '../../shared/number.service';
import { NumberSlot } from '../../shared/number.model'
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-dashboard-number-slots',
  templateUrl: './dashboard-number-slots.component.html',
  styleUrls: ['./dashboard-number-slots.component.scss']
})
export class DashboardNumberSlotsComponent implements OnInit, OnDestroy {

  subscriptions: {
    lotterySettings?: Subscription
  } = { }
  lotterySettings: LotterySettings;
  currentSlot: NumberSlot;

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private numberService: NumberService,
    private toastrService: ToastrService,
  ) { }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
      .subscribe(
        value => {
          this.lotterySettings = value;
          this.currentSlot = this.numberService.resolveNumberDigits(this.lotterySettings.displayCurrentSlot);
        },
        error => this.handleError(error)
      );
  }

  ngOnDestroy() {
      this.subscriptions.lotterySettings.unsubscribe();
  }

}

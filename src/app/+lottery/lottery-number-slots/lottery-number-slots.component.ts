import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { NumberService } from '../shared/number.service';
import { NumberSlot } from '../shared/number.model'
import { ToastrService } from 'toastr-ng2';


@Component({
  selector: 'app-lottery-number-slots',
  templateUrl: './lottery-number-slots.component.html',
  styleUrls: ['./lottery-number-slots.component.scss']
})
export class LotteryNumberSlotsComponent implements OnInit, OnDestroy {

  subscriptions: {
    currentSlot?: Subscription
  } = { }
  currentSlot: NumberSlot

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
    this.subscriptions.currentSlot = this.lotterySettingsService.getCurrentSlot()
      .subscribe(
        value => this.currentSlot = this.numberService.resolveNumberDigits(value),
        error => this.handleError(error)
      );
  }

  ngOnDestroy() {
      this.subscriptions.currentSlot.unsubscribe();
  }

}

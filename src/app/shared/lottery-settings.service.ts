import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ToastrService } from 'toastr-ng2';

import { LotterySettings, lotterySettingsRef, lotteryCurrentPrizeRef, lotteryCurrentSlotRef } from './lottery-settings.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

@Injectable()
export class LotterySettingsService {

  lotterySettings: { data?: LotterySettings } = {};

  constructor(
    private af: AngularFire,
    private toastrService: ToastrService
  ) { }

  getSettings() {
    return this.af.database.object(lotterySettingsRef);
  }

  setCurrentPrize(value: number) {
    this.af.database.object(lotterySettingsRef).update({ displayCurrentPrize: value })
      .catch(error => this.handleError(error));
  }

  setCurrentSlot(value: number) {
    this.af.database.object(lotterySettingsRef).update({ displayCurrentSlot: value })
      .catch(error => this.handleError(error));
  }

  getCurrentSlot() {
    return this.af.database.object(lotteryCurrentSlotRef)
      .map(data => data.$value);
  }

  getCurrentPrize() {
    return this.af.database.object(lotteryCurrentPrizeRef)
      .map(data => data.$value);
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }



}
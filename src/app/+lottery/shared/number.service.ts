import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';
import { NumberSlot } from './number.model';
import * as _ from 'lodash';

@Injectable()
export class NumberService {

  lotterySettings: { data?: LotterySettings }; 

  constructor(
    private af: AngularFire,
    private lotterySettingsService: LotterySettingsService
  ) { 
    this.lotterySettings = this.lotterySettingsService.getSettings();
  }

  generateWinningNumber(): number {
    return _.random(this.lotterySettings.data.numberRandomMin, this.lotterySettings.data.numberRandomMax);
  }

  resolveNumberDigits(value: number): NumberSlot {
    if (value >= 0 && value <= 99) {
      return { firstDigit: Math.floor(value / 10), secondDigit: value % 10 }
    }
    return { firstDigit: 0, secondDigit: 0 }
  }

}

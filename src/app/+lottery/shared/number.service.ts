import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NumberSlot } from './number.model';
import * as _ from 'lodash';

@Injectable()
export class NumberService {

  constructor(
    private af: AngularFire,
  ) {
  }

  generateWinningNumber(options: { min: number; max: number; forbiddenValue: number[] } = { min: 0, max: 99, forbiddenValue: [] }): Promise<number> {
    return new Promise((resolve, reject) => {
      let allowedValue = _.difference(_.range(options.min, options.max + 1), options.forbiddenValue);
      if (allowedValue.length) {
        let selectedIndex = _.random(0, allowedValue.length - 1);
        resolve(allowedValue[selectedIndex]);
      } else {
        reject(new Error('Không còn giá trị số ngẫu nhiên trong khoảng giới hạn được chọn. Vui lòng điều chỉnh lại thiết lập của bạn.'));
      }
    });
  }

  resolveNumberDigits(value: number): NumberSlot {
    if (value >= 0 && value <= 99) {
      return { firstDigit: Math.floor(value / 10), secondDigit: value % 10 }
    }
    return { firstDigit: 0, secondDigit: 0 }
  }

}

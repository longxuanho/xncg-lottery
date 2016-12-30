import { Injectable } from '@angular/core';
import { Prizes } from './result.model';
import { AngularFire } from 'angularfire2';
import { Result, currentResultsRef } from '../shared/result.model';
import { ToastrService } from 'toastr-ng2';
import { LotterySettingsService } from '../shared/lottery-settings.service';
import { LotterySettings } from '../shared/lottery-settings.model';
import 'rxjs/add/operator/map';


@Injectable()
export class ResultService {

  currentResults: { data: Result[] } = {
    data: []
  }
  currentSettings: { data?: LotterySettings } = {};

  constructor(
    private af: AngularFire,
    private lotterySettingService: LotterySettingsService,
    private toastrService: ToastrService
  ) { 
    this.currentSettings = this.lotterySettingService.getSettings();
  }

  getResults() {
    return this.af.database.list(currentResultsRef, { 
        query: {
          limitToFirst: (this.currentSettings.data && this.currentSettings.data.resultMaxCount) ? this.currentSettings.data.resultMaxCount : 20
        }
      });
  }

  getCurrentResults() {
    return this.currentResults;
  }

  addNewResult(newResult: Result) {
    return this.af.database.list(currentResultsRef).push(newResult);
  }

  syncCurrentResults() {
    return this.af.database.list(currentResultsRef, { 
        query: {
          limitToFirst: (this.currentSettings.data && this.currentSettings.data.resultMaxCount) ? this.currentSettings.data.resultMaxCount : 20
        }
      })
      .subscribe(
        data => this.currentResults.data = <Result[]>data,
        error => this.handleError(error),
        () => console.log('Truy vấn results: complete'));
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Truy vấn kết quả thất bại');
  }

  resolvePrizeText(value: number): string {
    switch (value) {
      case Prizes.GiaiNhat:
        return 'Giải Nhất';
      case Prizes.GiaiNhi:
        return 'Giải Nhì';
      case Prizes.GiaiBa:
        return 'Giải Ba';
    }
    return '';
  }

}

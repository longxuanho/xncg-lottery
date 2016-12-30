import { Injectable } from '@angular/core';
import { Prizes } from './result.model';
import { AngularFire } from 'angularfire2';
import { Result, currentResultsRef } from '../shared/result.model';
import { ToastrService } from 'toastr-ng2';
import { SettingsService } from '../core/shared/settings.service';
import { Settings } from '../core/shared/settings.model';




@Injectable()
export class ResultService {

  currentResults: { data: Result[] } = {
    data: []
  }
  currentSettings: { data?: Settings };

  constructor(
    private af: AngularFire,
    private settingsService: SettingsService,
    private toastrService: ToastrService
  ) { 
    this.currentSettings = this.settingsService.getSettings();
  }

  getCurrentResults() {
    return this.currentResults;
  }

  syncCurrentResults() {
    return this.af.database.list(currentResultsRef, { 
        query: {
          limitToFirst: (this.currentSettings.data && this.currentSettings.data.maxResults) ? this.currentSettings.data.maxResults : 20
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

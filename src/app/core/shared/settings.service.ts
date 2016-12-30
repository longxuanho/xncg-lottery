import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ToastrService } from 'toastr-ng2';

import { Settings, settingsRef, currentPrizeRef, displaySettingsRef } from './settings.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {

  appSettings: { data?: Settings } = { };
    
  constructor(
    private af: AngularFire,
    private toastrService: ToastrService
  ) { }

  syncSettings() {
    return this.af.database.object(settingsRef)
      .subscribe(
        data => this.appSettings.data = <Settings>data,
        error => this.handleError(error),
        () => console.log('Truy vấn settings: complete'));
  }  

  getSettings() {
    return this.appSettings;
  }

  setCurrentPrize(value: number) {
      this.af.database.object(displaySettingsRef).set({ currentPrize: value })
      .catch(error => this.handleError(error));
  }

  getCurrentPrize() {
    return this.af.database.object(currentPrizeRef)
      .map(data => data.$value);
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  

}
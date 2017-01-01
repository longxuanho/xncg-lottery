import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { ToastrService } from 'toastr-ng2';
import { AuthService } from '../core/shared/auth.service'
import { LotterySettings, lotterySettingsRef } from './lottery-settings.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/empty';

@Injectable()
export class LotterySettingsService {

  lotterySettings: { data?: LotterySettings } = {};

  constructor(
    private af: AngularFire,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { }

  setSettings(settings: LotterySettings) {
    const uid = this.authService.getAuth().data.uid;
    return this.af.database.object(lotterySettingsRef + `/${uid}`).set(settings);
  }

  patchSettings(options) {
    const uid = this.authService.getAuth().data.uid;
    return this.af.database.object(lotterySettingsRef + `/${uid}`).update(options);
  }
  
  getSettings() {
    return this.authService.syncAuth()
      .mergeMap(auth => {
        if (auth && auth.uid)
          return this.af.database.object(lotterySettingsRef  + `/${auth.uid}`)
        return Observable.empty();
      })
    // const uid = this.authService.getAuth().data.uid;
    // return this.af.database.object(lotterySettingsRef  + `/${uid}`);
  }

  setCurrentPrize(value: number) {
    const uid = this.authService.getAuth().data.uid;
    this.af.database.object(lotterySettingsRef + `/${uid}`).update({ displayCurrentPrize: value })
      .catch(error => this.handleError(error));
  }

  setCurrentSlot(value: number) {
    const uid = this.authService.getAuth().data.uid;
    return this.af.database.object(lotterySettingsRef + `/${uid}`).update({ displayCurrentSlot: value });    
  }

  getCurrentSlot() {
    const uid = this.authService.getAuth().data.uid;
    return this.af.database.object(lotterySettingsRef + `/${uid}/displayCurrentSlot`)
      .map(data => data.$value);
  }

  getCurrentPrize() {
    const uid = this.authService.getAuth().data.uid;
    return this.af.database.object(lotterySettingsRef + `/${uid}/displayCurrentPrize`)
      .map(data => data.$value);
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

}
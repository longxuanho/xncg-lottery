import { Injectable } from '@angular/core';
import { Prizes } from './result.model';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { AuthService } from '../core/shared/auth.service';
import { Result, resultsRef } from '../shared/result.model';
import { ToastrService } from 'toastr-ng2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';


@Injectable()
export class ResultService {

  constructor(
    private af: AngularFire,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { 
  }

  getResults(options: { resultMaxCount: number } = { resultMaxCount: 30 }) {
    return this.af.auth.mergeMap((auth) => {
      if (auth && auth.uid)
        return this.af.database.list(resultsRef + `/${auth.uid}`, {
          query: {
            limitToLast: options.resultMaxCount
          }
        });
      return Observable.empty();
    })
  }

  addNewResult(newResult: Result) {
    if (this.authService.auth.data) {
      const uid = this.authService.auth.data.uid;
      return this.af.database.list(resultsRef + `/${uid}`).push(newResult)
        .then(success => new Promise((resolve, reject) => resolve()))
        .catch(error => new Promise((resolve, reject) => reject(new Error(`Tạo mới thất bại. ${error.message}`))));
    }
    return new Promise((resolve, reject) => reject(new Error('Người dùng chưa đăng nhập')));
  }

  resetResults() {
    if (this.authService.auth.data) {
      const uid = this.authService.auth.data.uid;
      return this.af.database.list(resultsRef + `/${uid}`).remove()
        .then(success => new Promise((resolve, reject) => resolve()))
        .catch(error => new Promise((resolve, reject) => reject(new Error(`Reset thất bại. ${error.message}`))));
    }
    return new Promise((resolve, reject) => reject(new Error('Người dùng chưa đăng nhập')));
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

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Truy vấn kết quả thất bại');
  }

}

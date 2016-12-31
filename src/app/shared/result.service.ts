import { Injectable } from '@angular/core';
import { Prizes } from './result.model';
import { AngularFire } from 'angularfire2';
import { Result, currentResultsRef } from '../shared/result.model';
import { ToastrService } from 'toastr-ng2';
import 'rxjs/add/operator/map';


@Injectable()
export class ResultService {

  constructor(
    private af: AngularFire,
    private toastrService: ToastrService
  ) { 
  }

  getResults(options: { resultMaxCount: number } = { resultMaxCount: 20 }) {
    return this.af.database.list(currentResultsRef, { 
        query: {
          limitToFirst: options.resultMaxCount
        }
      });
  }

  addNewResult(newResult: Result) {
    return this.af.database.list(currentResultsRef).push(newResult);
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

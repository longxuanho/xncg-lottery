import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Result } from '../../shared/result.model';

@Injectable()
export class DataFlowService {

  private numberGeneratedSource = new Subject<Result>();
  numberGenerated$ = this.numberGeneratedSource.asObservable();

  private numberAnimatedSource = new Subject<Result>();
  numberAnimated$ = this.numberAnimatedSource.asObservable();
  

  constructor() { }

  generatedNumber(result: Result) {
    this.numberGeneratedSource.next(result);
  }

  animatedNumber(result: Result) {
    this.numberAnimatedSource.next(result);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultService } from '../../shared/result.service';
import { Result } from '../../shared/result.model';
import { ToastrService } from 'toastr-ng2';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';


@Component({
  selector: 'app-lottery-result-list-preview',
  templateUrl: './lottery-result-list-preview.component.html',
  styleUrls: ['./lottery-result-list-preview.component.scss']
})
export class LotteryResultListPreviewComponent implements OnInit, OnDestroy {

  results: { [key: string]: Result[] } = {};
  hasResult: boolean = false;
  subscriptions: {
    results?: Subscription,
    lotterySettings?: Subscription
  } = { }

  constructor(
    private resultService: ResultService,
    private toastrService: ToastrService,
  ) { }

  resolveResult(rawData: Result[]) {
    if (rawData && rawData.length) {
      this.results = _.groupBy(rawData, 'prize');
      this.hasResult = true;
    } else {
      this.results = {};
      this.hasResult = false;
    }   
  }
  

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.results = this.resultService.getResults()      
      .subscribe(
        (value: Result[]) => {
          if (_.isEmpty(this.results)) {
            this.resolveResult(value);
          } else {
            // Chờ 15s để hoàn thành animate sau đó mới hiển thị kết quả
            setTimeout(() => {
              this.resolveResult(value);
            }, 15000); 
          }

                            
        },
        (errors: Error) => this.handleError(errors)
      )
  }

  ngOnDestroy() {
    this.subscriptions.results.unsubscribe();
  }

}

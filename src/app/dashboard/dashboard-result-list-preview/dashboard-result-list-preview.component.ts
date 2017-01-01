import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultService } from '../../shared/result.service';
import { Result } from '../../shared/result.model';
import { ToastrService } from 'toastr-ng2';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard-result-list-preview',
  templateUrl: './dashboard-result-list-preview.component.html',
  styleUrls: ['./dashboard-result-list-preview.component.scss']
})
export class DashboardResultListPreviewComponent implements OnInit, OnDestroy {

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

  handleError(error: Error) {
    // console.log(`${error.message}: ${error.stack}`);
    // this.toastrService.warning(error.message, 'Ngắt kết nối tới server...');
    this.subscriptions.results.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions.results = this.resultService.getResults()      
      .subscribe(
        (results: Result[]) => {
          if (results && results.length) {
            this.results = _.groupBy(results, 'prize');
            this.hasResult = true;
          } else {
            this.results = {};
            this.hasResult = false;
          }            
        },
        (errors: Error) => this.handleError(errors)
      )
  }

  ngOnDestroy() {
    this.subscriptions.results.unsubscribe();
  }

}

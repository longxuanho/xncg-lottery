import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'toastr-ng2';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { LotterySettings } from '../../shared/lottery-settings.model';

@Component({
  selector: 'app-dashboard-heading',
  templateUrl: './dashboard-heading.component.html',
  styleUrls: ['./dashboard-heading.component.scss']
})
export class DashboardHeadingComponent implements OnInit, OnDestroy {

  subscriptions: {
    lotterySettings?: Subscription,
  } = {}
  lotterySettings: LotterySettings;

  constructor(
    private toastrService: ToastrService,
    private lotterySettingsService: LotterySettingsService,
  ) { }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.lotterySettings = this.lotterySettingsService.getSettings()
        .subscribe(
        settings => this.lotterySettings = settings,
        error => this.handleError(error));    
   }

   ngOnDestroy() {
     this.subscriptions.lotterySettings.unsubscribe();
   }

}

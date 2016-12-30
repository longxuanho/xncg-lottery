import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from '../../core/shared/settings.service';
import { ToastrService } from 'toastr-ng2';
import { Result, Prizes } from '../../shared/result.model';
import { ResultService } from '../../shared/result.service';

@Component({
  selector: 'app-lottery-controls',
  templateUrl: './lottery-controls.component.html',
  styleUrls: ['./lottery-controls.component.scss']
})
export class LotteryControlsComponent implements OnInit, OnDestroy {

  result: Result;
  currentPrize: number;
  currentPrizeText: string;
  
  subscriptions: {
    currentPrize?: Subscription
  } = { }

  constructor(
    private settingsService: SettingsService,
    private toastrService: ToastrService,
    private resultService: ResultService
  ) { }

  setCurrentPrize(event: Event,value: number) {
    event.preventDefault();
    this.settingsService.setCurrentPrize(value);
  }

  onSubmit() {

  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.currentPrize = this.settingsService.getCurrentPrize()
      .subscribe(
        value => {
          this.currentPrize = value;
          this.currentPrizeText = this.resultService.resolvePrizeText(value);
        },
        error => this.handleError(error)
      );
  }

  ngOnDestroy() {
      this.subscriptions.currentPrize.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LotterySettingsService } from '../../shared/lottery-settings.service';
import { ToastrService } from 'toastr-ng2';
import { NumberService } from '../shared/number.service';
import { Result, Prizes } from '../../shared/result.model';
import { ResultService } from '../../shared/result.service';

@Component({
  selector: 'app-lottery-controls',
  templateUrl: './lottery-controls.component.html',
  styleUrls: ['./lottery-controls.component.scss']
})
export class LotteryControlsComponent implements OnInit, OnDestroy {

  newResult: Result;
  submitting: boolean;
  currentPrize: number;
  currentPrizeText: string;
  
  subscriptions: {
    currentPrize?: Subscription
  } = { }

  constructor(
    private lotterySettingsService: LotterySettingsService,
    private toastrService: ToastrService,
    private resultService: ResultService,
    private numberService: NumberService
  ) { }

  setCurrentPrize(event: Event,value: number) {
    event.preventDefault();
    this.lotterySettingsService.setCurrentPrize(value);
  }

  onSubmit() {
    this.newResult = {
      prize: this.currentPrize,
      number: this.numberService.generateWinningNumber()
    }
    this.resultService.addNewResult(this.newResult)
      .then(success => this.lotterySettingsService.setCurrentSlot(this.newResult.number))
      .catch((error: Error) => this.handleError(error));
  }

  handleError(error: Error) {
    console.log(`${error.message}: ${error.stack}`);
    this.toastrService.error(error.message, 'Đồng bộ thiết lập thất bại');
  }

  ngOnInit() {
    this.subscriptions.currentPrize = this.lotterySettingsService.getCurrentPrize()
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

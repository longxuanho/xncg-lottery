import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lottery-number-digit',
  templateUrl: './lottery-number-digit.component.html',
  styleUrls: ['./lottery-number-digit.component.scss']
})
export class LotteryNumberDigitComponent implements OnInit, OnChanges {

  @Input() digit: number;
  @Input() colorCode: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}

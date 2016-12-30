import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lottery-number-digit',
  templateUrl: './lottery-number-digit.component.html',
  styleUrls: ['./lottery-number-digit.component.scss']
})
export class LotteryNumberDigitComponent implements OnInit {

  @Input() digit: number;

  constructor() { }

  ngOnInit() {
  }

}

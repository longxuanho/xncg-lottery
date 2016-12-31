import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AnimateDigit } from '../../shared/number.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-dashboard-number-digit',
  templateUrl: './dashboard-number-digit.component.html',
  styleUrls: ['./dashboard-number-digit.component.scss']
})
export class DashboardNumberDigitComponent implements OnInit, OnChanges {
  
  // @Input() digit: number;
  @Input() target: AnimateDigit;
  @Input() colorCode: number;

  digit: number = 0;
  lastDigit: number = 0;
  speed: number = 300;
  elapsedTime: number = 0;

  constructor() { }

  ngOnInit() {
  }

  startAnimation(animate: AnimateDigit) {
    Observable.create((observer: Observer<number>) => {
      let timer = setInterval(this.nextDigit(observer, animate), this.speed)
    }).subscribe((digit) => { console.log('digit: ', digit)})
  }

  nextDigit(observer: Observer<number>, animateObject: AnimateDigit) {
    this.elapsedTime = this.elapsedTime + this.speed;
    this.digit++;
    if (this.digit > 9)
      this.digit = 0;
    
    if (this.elapsedTime > animateObject.minAnimanateTime && this.digit === animateObject.targetDigit)
      observer.complete();
    else
      observer.next(this.digit);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['target']) {
      console.log(changes['target'].currentValue);
      this.lastDigit = this.digit;
      this.elapsedTime = 0;
      this.startAnimation(changes['target'].currentValue as AnimateDigit);
    }
  }

}

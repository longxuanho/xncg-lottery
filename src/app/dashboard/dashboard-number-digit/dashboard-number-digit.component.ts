import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-number-digit',
  templateUrl: './dashboard-number-digit.component.html',
  styleUrls: ['./dashboard-number-digit.component.scss']
})
export class DashboardNumberDigitComponent implements OnInit {
  
  @Input() digit: number;
  @Input() colorCode: number;

  constructor() { }

  ngOnInit() {
  }

}

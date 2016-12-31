import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit() {    
  }

  ngAfterViewInit() {
    $('body').addClass('has-background-image');
  }


  ngOnDestroy() {
    $('body').removeClass('has-background-image');
  }

}

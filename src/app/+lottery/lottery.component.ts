import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';


declare var $: any;

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent implements OnInit, OnDestroy, AfterViewInit {


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

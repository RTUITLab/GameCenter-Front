import { Component, ViewChild, OnInit } from '@angular/core';
// from https://material.angular.io/components/sidenav/examples
import {MatSidenav} from '@angular/material/sidenav';
////
import { HubService } from './hub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './app.component-mob.scss']
})
export class AppComponent {
  title = 'app';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  // from https://material.angular.io/components/sidenav/examples
   @ViewChild('sidenav') sidenav: MatSidenav;
   reason = '';
   close(reason: string) {
     this.reason = reason;
     this.sidenav.close();
   }
  constructor(
    public _hub: HubService,
  ) {
    this._hub.connect();
  }
  private cmmon() {
    this._hub.connect();
  }
  ////



}

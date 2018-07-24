import { Component,ViewChild,OnInit } from '@angular/core';
//from https://material.angular.io/components/sidenav/examples
import {MatSidenav} from '@angular/material/sidenav';
////

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  ngOnInit(){

  }
  
  //from https://material.angular.io/components/sidenav/examples
   @ViewChild('sidenav') sidenav: MatSidenav;

   reason = '';
 
   close(reason: string) {
     this.reason = reason;
     this.sidenav.close();
   }
 
   shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
 
  ////



}

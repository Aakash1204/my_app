import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.css']
})
export class MainAppComponent {
  @ViewChild('tabChange') tabChange: any;
  
  constructor(public router: Router){}

  tabClick(){
    this.tabChange.fetchData();
  }
}

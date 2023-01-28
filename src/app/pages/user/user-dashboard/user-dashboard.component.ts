import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  cId: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

  childToParent(cId: number) {
    this.cId = cId;
  }

}

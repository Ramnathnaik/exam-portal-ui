import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: any = [];

  user: any = {};

  displayedColumns: string[] = ['name', 'value'];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.userDetails.push({name: 'Username', value: this.user.username});
    this.userDetails.push({name: 'Phone', value: this.user.phone});
    this.userDetails.push({name: 'Email', value: this.user.email});
    this.userDetails.push({name: 'Role', value: this.user.authorities[0].authority});
    this.userDetails.push({name: 'Status', value: this.user.enabled ? 'ACTIVE' : 'NOT ACTIVE' });
  }

}

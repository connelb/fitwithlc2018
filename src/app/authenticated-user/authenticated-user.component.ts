import { Component, OnInit } from '@angular/core';
// import {AuthService} from '../../fw/auth';

@Component({
  selector: 'app-authenticated-user',
  templateUrl: './authenticated-user.component.html',
  styleUrls: ['./authenticated-user.component.css']
})
export class AuthenticatedUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // isAuthenticated(){
  //   return this.authService.currentStatus == 'signedIn';
  // }

}

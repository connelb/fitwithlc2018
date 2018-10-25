import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//import { AuthService } from './fw/auth/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated = false;

  constructor(
              private router: Router) {
  }//private authService: AuthService,

  ngOnInit() {
    // this.authService.authStatusChanged.subscribe(
    //   (authenticated) => {
    //     this.isAuthenticated = authenticated;
    //     if (authenticated) {
    //       this.router.navigate(['/']);
    //     } else {
    //       this.router.navigate(['/']);
    //     }
    //   }
    // );
    // this.authService.initAuth();
    //this.authService.
  }

  onLogout() {
    //this.authService.signout();
  }
}

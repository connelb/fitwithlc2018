import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './../auth/service';
import { SettingsComponent } from './../settings/settings.component'

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  // something = this.authService.getCurrentUser((err, currentSignedInUser) => {return currentSignedInUser})

  // isAuthenticated(){
  //   // // let temp = this.authService.getCurrentUser((err, currentSignedInUser) => {return currentSignedInUser })
  //   // // console.log(temp)

  //   return true;
  //   //console.log('this.authService.currentStatus',this.authService.currentStatus,
  //    //this.authService.getCurrentUser((err, currentSignedInUser) => {return currentSignedInUser}))
  //   //return this.authService.currentStatus == 'signedIn';
  // } 
  ngOnInit(): void {
    this.isAuthenticated()
  }
  
  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    // console.log(this.authService.currentStatus);
    //console.log(this.authService.isAuthenticated);
    if(this.authService.isAuthenticated){
      return true;
    }
    
    //new Date().getTime() < this.authService.cognitoAwsCredentials.expireTime.getDate();
  }


}

import { Injectable }     from '@angular/core';
import { CanActivate, CanActivateChild, Router }    from '@angular/router';

//import { UserService } from './user.service';
import {AuthService} from './../auth';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService,  private router: Router) {} //private userService: UserService,

    canActivate() : boolean {
        console.log('AuthGuard#canActivate called ' + this.authService.currentStatus  );
        
        //if (!this.userService.isAuthenticated) {
        if  (this.authService.currentStatus == 'unknown'){
            console.log('not auth');
            this.router.navigate(['/signin']);
        }
        //return this.userService.isAuthenticated;
        return this.authService.currentStatus == 'signedIn';
    }

    canActivateChild() : boolean {
        return this.canActivate();
    }


}
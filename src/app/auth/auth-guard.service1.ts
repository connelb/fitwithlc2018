import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route } from '@angular/router';

import { AuthService } from './../auth';

@Injectable()
export class AuthGuard1 implements CanActivate, CanLoad {

    constructor(private authService: AuthService,
                private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    canLoad(route: Route): boolean {
        return this.checkLoggedIn(route.path);
    }

    checkLoggedIn(url: string): boolean {
        // if (this.authService.isLoggedIn()) {
        //     return true;
        // }
        // this.authService.redirectUrl = url;
        // this.router.navigate(['/signin']);
        return false;
    }
}

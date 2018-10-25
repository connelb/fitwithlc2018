import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { SigninComponent } from './../auth/signin/component';
//import { AuthService } from './auth.service';
//import { AuthService } from './../auth/service';
import { AuthGuard1 } from './auth-guard.service1';

import { SharedModule } from '../shared/shared.module';
// import { LoadingComponent } from './../loading/component';

import {
  AuthService,
  FirstTimePasswordComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  SigninComponent,
  SignoutComponent
} from './../auth';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'signin', component: SigninComponent }
    ])
  ],
  declarations: [
    SigninComponent,
    FirstTimePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SigninComponent,
    SignoutComponent
  ],
  providers: [
    AuthService,
    AuthGuard1
  ]
})
export class AuthModule { }

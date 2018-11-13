import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//import { SigninComponent } from './../auth/signin/component';
//import { AuthService } from './auth.service';
//import { AuthService } from './../auth/service';
import { AuthGuard1 } from './auth-guard.service1';

import { SharedModule } from '../shared/shared.module';
// import { LoadingComponent } from './../loading/component';
import { TokenInterceptor } from './token.interceptor';

import {
  AuthService,
  FirstTimePasswordComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  SigninComponent,
  SignoutComponent
} from './../auth';
import { RegisterComponent } from '../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    FormsModule, ReactiveFormsModule ,
    RouterModule.forChild([
      // { path: 'signin', component: SigninComponent },
      { path: 'firsttime', component: FirstTimePasswordComponent },
      { path: 'forgt', component: ForgotPasswordComponent },
      { path: 'reset', component: ResetPasswordComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signout', component: SignoutComponent },
      { path: 'register', component: RegisterComponent},

    ])
  ],
  declarations: [
    SigninComponent,
    FirstTimePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SigninComponent,
    SignoutComponent,
    RegisterComponent,
  ],
  providers: [
    AuthService,
    TokenInterceptor,
    AuthGuard1
  ]
})
export class AuthModule { }

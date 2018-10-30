import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { SigninComponent } from './user/signin/signin.component';
// import { SigninComponent } from './auth/signin/component';
// import { SignupComponent } from './auth/signup/component';
// import { CompareComponent } from './compare/compare.component';
//import { AuthGuard } from './user/auth-guard.service';
import { DownloadComponent } from './download/component';
import { UploadContainerComponent } from './upload/component';
// import {HomeComponent} from './home';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { RegisterComponent } from './register/register.component';
import {
  AuthService,
  FirstTimePasswordComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  SigninComponent,
  SignoutComponent
} from './auth';
import { WelcomeComponent } from './welcome/welcome.component'

//import { AuthGuard } from './services/auth-guard.service';
import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PhotoListComponent } from './cloudinary/photo-list/photo-list.component';
import { PhotoUploadComponent } from './cloudinary/photo-album/photo-upload.component';
//import { CompareComponent } from './compare/compare.component'; //CompareComponent 


const routes: Routes = [
  { path: '', component: UploadContainerComponent, pathMatch: 'full' },
  //{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
  // { path: 'welcome', component: WelcomeComponent },
  //{ path: 'compare', component: CompareComponent},
  { path: 'signin', component: SigninComponent },
  // { path: 'settings', component: SettingsComponent },
  // { path: 'signout', component: SignoutComponent },
  // { path: 'profile', component: MyProfileComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'photos', component: PhotoListComponent },
  { path: 'download', component: DownloadComponent},
  { path: 'upload', component: UploadContainerComponent},
  // { path: 'photos/new', component: PhotoUploadComponent },
  {
    path: 'authenticated', component: AuthenticatedUserComponent,
    children: [
      { path: '', redirectTo: 'photos', pathMatch: 'full' },
      { path: 'photos', component: PhotoListComponent },
      //{ path: 'compare', component: CompareComponent},
      { path: 'upload', component: UploadContainerComponent},
      { path: 'download', component: DownloadComponent},
    ]
  },

  { path: '**', component: PhotoListComponent }
]

// const routes: Routes = [
//   { path: 'signin', component: SigninComponent },
//   { path: 'first-time-password', component: FirstTimePasswordComponent },
//   { path: 'forgot-password', component: ForgotPasswordComponent },
//   { path: 'reset-password', component: ResetPasswordComponent },

//   {
//     path: 'authenticated', component: AuthenticatedUserComponent, canActivate: [AuthGuard],
//     children: [
//       {
//         path: '', canActivateChild: [AuthGuard],
//         children: [
//           { path: '', redirectTo: 'welcome', pathMatch: 'full' },
//           { path: 'upload', component: UploadContainerComponent },
//           { path: 'signout', component: SignoutComponent },
//           { path: 'dashboard', component: DashboardComponent },
//           //           { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//           { path: 'welcome', component: WelcomeComponent },
//           //           { path: 'country-list/:count', component: CountryListComponent },
//           //           { path: 'country-detail/:id/:operation', component: CountryDetailComponent },
//           //           { path: 'country-maint', component: CountryMaintComponent },
//           { path: 'settings', component: SettingsComponent }
//         ]
//       }
//     ]
//   },
//   //{ path: 'compare', canActivate: [AuthGuard], component: CompareComponent },

//   { path: '', component: WelcomeComponent },
//   { path: '**', component: WelcomeComponent }
// ];



// @NgModule({
//     imports: [
//         RouterModule.forRoot([
//             { path: 'welcome', component: WelcomeComponent },
//             { path: '', redirectTo: 'welcome', pathMatch: 'full' },
//             { path: '**', component: PageNotFoundComponent }
//         ], { enableTracing: true })
//     ],
//     exports: [ RouterModule ]
// })
// export class AppRoutingModule { }


@NgModule({
  imports: [RouterModule.forRoot(routes)],//, { enableTracing: true }
  exports: [RouterModule],
  providers: [AuthService]//[AuthGuard]
})
export class AppRoutingModule { }

// export const appRoutes: Routes = [  
//   { path: 'signin', component: SignInComponent },
//   { path: 'register', component: RegisterUserComponent },
//   { path: 'authenticated', component: AuthenticatedUserComponent, canActivate: [AuthGuard],
//     children: [
//       { path: '', canActivateChild: [AuthGuard],
//         children: [
//           { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//           { path: 'dashboard', component: DashboardComponent },
//           { path: 'country-list/:count', component: CountryListComponent },
//           { path: 'country-detail/:id/:operation', component: CountryDetailComponent },
//           { path: 'country-maint', component: CountryMaintComponent },
//           { path: 'settings', component: SettingsComponent },
//         ] }
//     ] },
//   { path: '', component: SignInComponent },
//   { path: '**', component: SignInComponent }
// ];

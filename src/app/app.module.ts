import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
// import { SignupComponent } from './auth/signup/component';
//import { SigninComponent } from './user/signin/signin.component';
// import { SigninComponent } from './auth/signin/component';
// import { CompareComponent } from './compare/compare.component';
import { AppRoutingModule } from './app-routing.module';
// import { AuthService } from './auth/service';

// import { CompareInputComponent } from './compare/compare-input/compare-input.component';
// import { CompareResultsComponent } from './compare/compare-results/compare-results.component';

// import { FwModule } from '../fw/fw.module';
import { PageNotFoundComponent } from './page-not-found.component';


// import {
//   //AuthService,
//   FirstTimePasswordComponent,
//   ForgotPasswordComponent,
//   ResetPasswordComponent,
//   SigninComponent,
//   SignoutComponent
// } from './auth';
// import {HomeComponent} from './home';
// import {HeaderComponent} from './header/component';
// import {FooterComponent} from './footer/component';
import { S3 } from 'aws-sdk';

// import { CompareInputComponent} from './compare/compare-input/compare-input.component';
// import { CompareResultsComponent} from './compare/compare-results/compare-results.component';

//import { appRoutes } from './app.routing';
// import { CountryDetailComponent } from './country-detail/country-detail.component';
// import { CountryListComponent } from './country-list/country-list.component';
// import { CountryMaintComponent } from './country-maint/country-maint.component';
//import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
//import { UserService } from './services/user.service';
//import { UserApi } from '../fw/users/user-api';
import { AuthGuard } from './services/auth-guard.service';
// import { CountryPanelComponent } from './panels/country-panel/country-panel.component';
// import { ImagePanelComponent } from './panels/image-panel/image-panel.component';

import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WelcomeComponent } from './welcome/welcome.component';
import { SharedModule } from './shared/shared.module';
import { RegisterComponent } from './register/register.component';
// import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

// import {MatInputModule} from '@angular/material/input';
// import {MatTableModule} from '@angular/material/table';
// @NgModule({
//   declarations: [
//     AppComponent,
//     DashboardComponent,
//     SettingsComponent,
//     CountryDetailComponent,
//     CountryListComponent,
//     CountryMaintComponent,
//     AuthenticatedUserComponent,
//     CountryPanelComponent,
//     ImagePanelComponent

//import { ProductListComponent } from './products/product-list.component';
/* Feature Modules */
import { AuthenicatedModule } from './authenicated/authenicated.module';
import { AuthModule } from './auth/auth.module';
import { AppMaterialModule } from './app-material/app-material.module';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    WelcomeComponent, 
    PageNotFoundComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    LayoutModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AuthenicatedModule,
    AuthModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    // AuthService,
    //UserService,
    //{ useExisting: UserService }, 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     PageNotFoundComponent
//   ],
//   imports: [
//     BrowserModule,
//     RouterModule.forRoot(APP_ROUTES),
//     DashboardModule
//   ],
//   providers: [],
// bootstrap: [AppComponent]

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductDetailComponent } from './product-detail.component';
// import { ProductEditComponent } from './product-edit.component';
// import { ProductEditInfoComponent } from './product-edit-info.component';
// import { ProductEditTagsComponent } from './product-edit-tags.component';

// import { ProductFilterPipe } from './product-filter.pipe';
// import { ProductService } from './product.service';
// import { ProductResolver } from './product-resolver.service';

// import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './../auth/signin/auth-guard.service';
import { DownloadComponent, DownLoadService } from './../download';
import {
  UploadContainerComponent,
  FileUploadComponent,
  UploadService
} from './../upload';
//import { AuthenticatedUserComponent } from './authenticated-user/authenticated-user.component';
import { DashboardComponent } from './../dashboard/dashboard.component';

//import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './../settings/settings.component';
import { CompareComponent } from './../compare/compare.component';
import { CompareService } from './../compare/compare.service';
import { FileSizePipe } from '../../utils';
import { MyProfileComponent } from './../my-profile/my-profile.component';

import { AppCloudinaryModule } from './../cloudinary/cloudinary.module';
import { AuthenicatedComponent } from './authenicated.component';
import { AuthenticatedUserComponent } from '../authenticated-user/authenticated-user.component';
import { SharedModule } from '../shared/shared.module';
import { CompareInputComponent } from '../compare/compare-input/compare-input.component';
import { CompareResultsComponent } from '../compare/compare-results/compare-results.component';
import { MatBottomSheetModule } from '@angular/material';
import { BottomSheetOverviewExampleSheet } from '../compare/compare-input/compare-input.component';
import { WorkoutInputComponent } from '../compare/workout-input/workout-input.component';
import { d3StreamComponent } from '../d3Stream/d3StreamComponent'
import { D3Service } from "d3-ng2-service"


@NgModule({
  imports: [
    SharedModule,
    AppCloudinaryModule,
    FormsModule, ReactiveFormsModule,
    MatBottomSheetModule, 
    RouterModule.forChild([
      //{
        // path: 'authenicated',component: ProductListComponent,
        // children: [

        // { path: 'photos', component: PhotoListComponent },
        { path: 'compare', component: CompareComponent},
        { path: 'upload', component: UploadContainerComponent},
        { path: 'download', component: DownloadComponent},
        { path: 'profile', component: MyProfileComponent },
        // { path: 'signout', component: SignoutComponent }
           //]
      //}//
    ])
  ],
  declarations: [
    ProductListComponent,
    FileSizePipe,
    DownloadComponent,
    UploadContainerComponent,
    FileUploadComponent, 
    DashboardComponent,
    SettingsComponent,
    CompareComponent,
    CompareInputComponent,
    CompareResultsComponent,
    //WelcomeComponent,
    MyProfileComponent,
    AuthenicatedComponent,
    AuthenticatedUserComponent,
    BottomSheetOverviewExampleSheet,
    WorkoutInputComponent,
    d3StreamComponent 
  ],
  entryComponents: [
    BottomSheetOverviewExampleSheet
  ],
  providers: [
    // ProductService,
    // ProductResolver
    CompareService,
    DownLoadService,
    UploadService,
    D3Service
  ]
})
export class AuthenicatedModule { }

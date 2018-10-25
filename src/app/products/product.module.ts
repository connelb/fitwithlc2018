import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
// import { ProductDetailComponent } from './product-detail.component';
// import { ProductEditComponent } from './product-edit.component';
// import { ProductEditInfoComponent } from './product-edit-info.component';
// import { ProductEditTagsComponent } from './product-edit-tags.component';

// import { ProductFilterPipe } from './product-filter.pipe';
// import { ProductService } from './product.service';
// import { ProductResolver } from './product-resolver.service';

// import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './../auth/signin/auth-guard.service';

@NgModule({
  imports: [
    // SharedModule,
    RouterModule.forChild([
      {
        path: 'products',component: ProductListComponent
        // children: [
        //   {
        //     path: '',
        //     component: ProductListComponent
        //   }]
      }
    ])
  ],
  declarations: [
    ProductListComponent
  ],
  providers: [
    // ProductService,
    // ProductResolver
  ]
})
export class ProductModule { }

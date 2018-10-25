import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from './../app-material/app-material.module';

@NgModule({
  imports: [ CommonModule],
  exports : [
    CommonModule,
    FormsModule,
    AppMaterialModule
  ],
  declarations: [ ],
})
export class SharedModule { }

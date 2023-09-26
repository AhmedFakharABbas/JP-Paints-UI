import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorRoutingModule } from './vendor-routing.module';


@NgModule({
  declarations: [
    CreateVendorComponent,
    VendorsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    VendorRoutingModule
  ]
})
export class VendorModule { }

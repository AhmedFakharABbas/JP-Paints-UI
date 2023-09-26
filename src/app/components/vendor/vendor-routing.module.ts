import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { VendorsComponent } from './vendors/vendors.component';


const routes: Routes = [
  
  // /vender/view'
  // /vender/edit'

  // { path: 'customer/view/:id', component: CustomerDetailsComponent },
  { path: 'edit/:id', component: CreateVendorComponent},

  {
    path: 'create',
    component: CreateVendorComponent
  },

  // {
  //   path: 'edit-vendor',
  //   component: CreateVendorComponent
  // },

  {
    path: 'all',
    component: VendorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }

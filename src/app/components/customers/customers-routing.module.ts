import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { SearchReferenceComponent } from './search-reference/search-reference.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { CustomerInteractionComponent } from './customer-interaction/customer-interaction.component';


const routes: Routes = [
  {
    path: 'all',
    component: AllCustomersComponent,
  },

  { path: 'view/:id', component: CustomerDetailsComponent },
  { path: 'edit/:id', component: CreateCustomerComponent },
  { path: 'create', component: CreateCustomerComponent },

  {
    path: 'search-reference',
    component: SearchReferenceComponent
  }, {
    path: 'customer-details',
    component: CustomerDetailsComponent
  },
  // {
  //   path: 'customer-interection',
  //   component: CustomerInteractionComponent
  // },

  {
    path: 'customer-interection/view/:id',
    component: CustomerInteractionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

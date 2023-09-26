import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { SearchReferenceComponent } from './search-reference/search-reference.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { AllCustomersComponent } from './all-customers/all-customers.component';
import { CustomerInteractionComponent } from './customer-interaction/customer-interaction.component';


import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomersRoutingModule
  ],
  declarations: [CreateCustomerComponent, AllCustomersComponent, SearchReferenceComponent, CustomerDetailsComponent, CustomerInteractionComponent],
  providers: [DatePipe]
})
export class CustomersModule { }

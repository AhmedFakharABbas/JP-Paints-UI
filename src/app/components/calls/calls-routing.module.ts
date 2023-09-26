import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallsModule } from './calls.module';
import { ScheduleBulkCallsComponent } from './schedule-bulk-calls/schedule-bulk-calls.component';
import { SchedulePhoneCallComponent } from './schedule-phone-call/schedule-phone-call.component';
import { SearchPhoneCallsComponent } from './search-phone-calls/search-phone-calls.component';
import { SearchUnschedulePhoneCallsComponent } from './search-unschedule-phone-calls/search-unschedule-phone-calls.component';
import { CustomerInteractionsComponent } from './customer-interactions/customer-interactions.component';
import { AllCustomerCallsComponent } from './all-customer-calls/all-customer-calls.component';
import { PhoneCallsComponent } from './phone-calls/phone-calls.component';


const routes: Routes = [

  {
    path: 'schedule-bulk',
    component: ScheduleBulkCallsComponent
  },

  {
    path: 'schedule',
    component: SchedulePhoneCallComponent
  },

  {
    path: '',
    component: PhoneCallsComponent
  },

  {
    path: 'search',
    component: SearchPhoneCallsComponent
  },

  {
    path: 'search-unscheduled',
    component: SearchUnschedulePhoneCallsComponent
  },

  {
    path: 'customer-interactions',
    component: CustomerInteractionsComponent
  },

  {
    path: 'customer-all',
    component: AllCustomerCallsComponent
  }

  // search-phone-calls
  // todays-phone-calls
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallsRoutingModule { }

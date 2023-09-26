import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { CallsRoutingModule } from "./calls-routing.module";
import { ScheduleBulkCallsComponent } from "./schedule-bulk-calls/schedule-bulk-calls.component";
import { ScheduleBulkCallsModalComponent } from "src/app/modals/schedule-bulk-calls-modal/schedule-bulk-calls-modal.component";
import { CallsComponent } from "./calls.component";
import { SchedulePhoneCallComponent } from "./schedule-phone-call/schedule-phone-call.component";
import { PhoneCallsComponent } from "./phone-calls/phone-calls.component";
import { SearchPhoneCallsComponent } from "./search-phone-calls/search-phone-calls.component";
import { SearchUnschedulePhoneCallsComponent } from "./search-unschedule-phone-calls/search-unschedule-phone-calls.component";
import { CustomerInteractionsComponent } from "./customer-interactions/customer-interactions.component";
import { AllCustomerCallsComponent } from "./all-customer-calls/all-customer-calls.component";
import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CallsRoutingModule,
    MatProgressSpinnerModule,
  ],

  declarations: [
    ScheduleBulkCallsComponent,
    ScheduleBulkCallsModalComponent,
    CallsComponent,
    SchedulePhoneCallComponent,
    PhoneCallsComponent,
    SearchPhoneCallsComponent,
    SearchUnschedulePhoneCallsComponent,
    CustomerInteractionsComponent,
    AllCustomerCallsComponent,
  ],
  providers: [DatePipe],

  exports: [ScheduleBulkCallsModalComponent],
  entryComponents: [ScheduleBulkCallsModalComponent],
})
export class CallsModule {}

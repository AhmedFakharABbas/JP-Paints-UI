import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MarketingComponent } from './marketing/marketing.component';
import { RestoreCustomerComponent } from './restore-customer/restore-customer.component';
import { ReferrelSourceComponent } from './referrel-source/referrel-source.component';
import { PaintBrandsComponent } from './paint-brands/paint-brands.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { AllUserLoginComponent } from './all-user-login/all-user-login.component';
import { ManageCalendersComponent } from './manage-calenders/manage-calenders.component';
import { PageTrackingComponent } from './page-tracking/page-tracking.component';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditCalendarsComponent } from './edit-calendars/edit-calendars.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [MarketingComponent, RestoreCustomerComponent, ReferrelSourceComponent, PaintBrandsComponent, CommissionsComponent, AllUserLoginComponent, ManageCalendersComponent, PageTrackingComponent, EditCalendarsComponent],
  providers: [NgbDatepickerModule],
})
export class AdminModule { }

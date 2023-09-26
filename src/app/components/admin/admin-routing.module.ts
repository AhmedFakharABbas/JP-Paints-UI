import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing/marketing.component';
import { RestoreCustomerComponent } from './restore-customer/restore-customer.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { AllUserLoginComponent } from './all-user-login/all-user-login.component';
import { ManageCalendersComponent } from './manage-calenders/manage-calenders.component';
import { PaintBrandsComponent } from './paint-brands/paint-brands.component';
import { PageTrackingComponent } from './page-tracking/page-tracking.component';
import { ReferrelSourceComponent } from './referrel-source/referrel-source.component';
import { EditCalendarsComponent } from './edit-calendars/edit-calendars.component';


const routes: Routes = [
  {
    path: 'marketing',
    component: MarketingComponent,
  },
  {
    path: 'restore-customer',
    component: RestoreCustomerComponent
  },
  {
    path: 'commissions',
    component: CommissionsComponent,
  },
  {
    path: 'all-user-login',
    component: AllUserLoginComponent
  },
  {
    path: 'manage-calenders',
    component: ManageCalendersComponent
  },
  {
    path: 'paint-brands',
    component: PaintBrandsComponent
  },
  {
    path: 'page-tracking',
    component: PageTrackingComponent
  },
  {
    path: 'referrel-source',
    component: ReferrelSourceComponent
  },
  {
    path: 'edit-calendar/:calendarId',
    component: EditCalendarsComponent
  },
  {
    path: 'create-calendar/:calendarId',
    component: EditCalendarsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

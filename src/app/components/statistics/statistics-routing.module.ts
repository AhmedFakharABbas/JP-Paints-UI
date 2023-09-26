import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticsComponent } from './statistics.component';
import { CustomerReferrelSourceComponent } from './customer-referrel-source/customer-referrel-source.component';
import { OverallExtimateStatisticsComponent } from './overall-extimate-statistics/overall-extimate-statistics.component';
import { OverallWorkStatisticsComponent } from './overall-work-statistics/overall-work-statistics.component';
import { EstimateCustomerZipcodeComponent } from './estimate-customer-zipcode/estimate-customer-zipcode.component';
import { WorkCustomerZipcodeComponent } from './work-customer-zipcode/work-customer-zipcode.component';
import { CsrCustomerComponent } from './csr-customer/csr-customer.component';
import { EstimatorBreakdownsComponent } from './estimator-breakdowns/estimator-breakdowns.component';
import { EstimatorWorkComponent } from './estimator-work/estimator-work.component';
import { MissingEstimatesComponent } from './missing-estimates/missing-estimates.component';
import { CrewBreakdownsComponent } from './crew-breakdowns/crew-breakdowns.component';

const routes: Routes = [
 
  {
    path: 'main',
    component: StatisticsComponent
  },
  {
    path: 'customer-referrel-source/marketing-costs',
    component: CustomerReferrelSourceComponent
  },
  {
    path: 'overall-estimate-statistics',
    component: OverallExtimateStatisticsComponent
  },
  {
    path: 'overall-work-statistics',
    component: OverallWorkStatisticsComponent
  },
  {
    path: 'estimate-by-customer-zipcode',
    component: EstimateCustomerZipcodeComponent
  },
  {
    path: 'work-by-customer-zipcode',
    component: WorkCustomerZipcodeComponent
  },
  {
    path: 'csr-customer-to-work-stats',
    component: CsrCustomerComponent
  },
  {
    path: 'estimator-breakdowns',
    component: EstimatorBreakdownsComponent
  },
  {
    path: 'estimate-to-work-stats',
    component: EstimatorWorkComponent
  },
  {
    path: 'missing-estimates',
    component: MissingEstimatesComponent
  },
  {
    path: 'crew-breakdowns',
    component: CrewBreakdownsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }

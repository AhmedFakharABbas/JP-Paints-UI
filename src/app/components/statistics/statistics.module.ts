import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';

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



@NgModule({
  declarations: [StatisticsComponent, CustomerReferrelSourceComponent, OverallExtimateStatisticsComponent, OverallWorkStatisticsComponent, EstimateCustomerZipcodeComponent, WorkCustomerZipcodeComponent, CsrCustomerComponent, EstimatorBreakdownsComponent, EstimatorWorkComponent, MissingEstimatesComponent, CrewBreakdownsComponent],
  providers:[DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    StatisticsRoutingModule
  ]
})
export class StatisticsModule { }

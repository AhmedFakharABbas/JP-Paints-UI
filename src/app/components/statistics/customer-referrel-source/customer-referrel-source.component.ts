import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { CustomerReferralSourceMarketingCosts } from '../../../models/customer-referral-source-marketing-costs.model';
import { DatePipe, formatDate } from '@angular/common';


@Component({
  selector: 'app-customer-referrel-source',
  templateUrl: './customer-referrel-source.component.html',
  styleUrls: ['./customer-referrel-source.component.css']
})
export class CustomerReferrelSourceComponent implements OnInit {

  customerReferralSourceMarketingCostsObj: CustomerReferralSourceMarketingCosts;
  customerReferralSourceMarketingCosts: Array<CustomerReferralSourceMarketingCosts>
  customerObj: Customer;
  statisticsObj: Statistics;

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService,
    private _adminService: AdminSideService, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.customerReferralSourceMarketingCostsObj = new CustomerReferralSourceMarketingCosts();
    this.customerReferralSourceMarketingCosts = new Array<CustomerReferralSourceMarketingCosts>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterCustomerReferralSourceMarketingCosts() {
    this._generalService.filterCustomerReferralSourceMarketingCosts(this.statisticsObj).subscribe((res: any) => {
      this.customerReferralSourceMarketingCosts = res.customerReferralSourceMarketingCosts;
    }, (error) => {
      this._sharedService.error(error);
    })
  }

  onClickToday() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.statisticsObj.start_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(tomorrow, 'yyyy-MM-dd');
  }

  onClickTodaysPrevious() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.statisticsObj.start_date = this.datepipe.transform(yesterday, 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  onClickTodaysNext() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.statisticsObj.start_date = this.datepipe.transform(tomorrow, 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(tomorrow.setDate(tomorrow.getDate() + 1), 'yyyy-MM-dd');
  }




  onClickThisWeek() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    this.statisticsObj.start_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(tomorrow, 'yyyy-MM-dd');
  }

  onClickThisWeeksPrevious() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 7);
    this.statisticsObj.start_date = this.datepipe.transform(yesterday, 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  onClickThisWeeksNext() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    this.statisticsObj.start_date = this.datepipe.transform(tomorrow, 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(tomorrow.setDate(tomorrow.getDate() + 7), 'yyyy-MM-dd');
  }

  onClickThisMonth() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 30);
    this.statisticsObj.start_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(tomorrow, 'yyyy-MM-dd');
  }

  onClickThisMonthsPrevious() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 30);
    this.statisticsObj.start_date = this.datepipe.transform(yesterday, 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  onClickThisMonthsNext() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 30);
    this.statisticsObj.start_date = this.datepipe.transform(tomorrow, 'yyyy-MM-dd');
    this.statisticsObj.end_date = this.datepipe.transform(tomorrow.setDate(tomorrow.getDate() + 30), 'yyyy-MM-dd');
  }




}

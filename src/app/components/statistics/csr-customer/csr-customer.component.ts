import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { CsrCustomerToWorkStats } from '../../../models/csr-customer-to-work-stats.model';


@Component({
  selector: 'app-csr-customer',
  templateUrl: './csr-customer.component.html',
  styleUrls: ['./csr-customer.component.css']
})
export class CsrCustomerComponent implements OnInit {

  customerObj: Customer;
  statisticsObj: Statistics;
  CsrCustomerToWorkStatsObj: CsrCustomerToWorkStats
  CsrCustomerToWorkStats: Array<CsrCustomerToWorkStats>

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {

    this.CsrCustomerToWorkStatsObj = new CsrCustomerToWorkStats();
    this.CsrCustomerToWorkStats = new Array<CsrCustomerToWorkStats>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterCSRCustomerToWorkStat() {
    this._generalService.filterCSRCustomerToWorkStat(this.statisticsObj).subscribe((res: any) => {
      this.CsrCustomerToWorkStats = res.CsrCustomerToWorkStats;
    }, (error) => {
      this._sharedService.error(error);
    })
  }

  

}

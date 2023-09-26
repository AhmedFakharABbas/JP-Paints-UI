import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { EstimatorBreakdowns } from '../../../models/estimator-breakdowns.model';


@Component({
  selector: 'app-estimator-breakdowns',
  templateUrl: './estimator-breakdowns.component.html',
  styleUrls: ['./estimator-breakdowns.component.css']
})
export class EstimatorBreakdownsComponent implements OnInit {

  customerObj: Customer;
  statisticsObj: Statistics;
  EstimatorBreakdownsObj: EstimatorBreakdowns;
  EstimatorBreakdowns: Array<EstimatorBreakdowns>;

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {
    this.EstimatorBreakdownsObj = new EstimatorBreakdowns();
    this.EstimatorBreakdowns = new Array<EstimatorBreakdowns>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterEstimatorBreakdowns() {
    this._generalService.filterEstimatorBreakdowns(this.statisticsObj).subscribe((res: any) => {
      this.EstimatorBreakdowns = res.EstimatorBreakdowns;
    }, (error) => {
      this._sharedService.error(error);
    })
  }


}

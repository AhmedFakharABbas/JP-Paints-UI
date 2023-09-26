import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { EstimateToWorkStats } from '../../../models/estimate-to-work-stats.model';


@Component({
  selector: 'app-estimator-work',
  templateUrl: './estimator-work.component.html',
  styleUrls: ['./estimator-work.component.css']
})
export class EstimatorWorkComponent implements OnInit {


  EstimateToWorkStatsObj: EstimateToWorkStats
  EstimateToWorkStats: Array<EstimateToWorkStats>
  customerObj: Customer;
  statisticsObj: Statistics;

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {
    this.EstimateToWorkStats = new Array<EstimateToWorkStats>();
    this.EstimateToWorkStatsObj = new EstimateToWorkStats();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterEstimateToWorkStat() {
    this._generalService.filterEstimateToWorkStat(this.statisticsObj).subscribe((res: any) => {
      this.EstimateToWorkStats = res.EstimateToWorkStats;
    }, (error) => {
      this._sharedService.error(error);
    })
  }

}

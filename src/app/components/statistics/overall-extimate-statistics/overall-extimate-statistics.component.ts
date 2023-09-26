import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { OverallEstimateStatistics } from '../../../models/overall-estimate-statistics.model';


@Component({
  selector: 'app-overall-extimate-statistics',
  templateUrl: './overall-extimate-statistics.component.html',
  styleUrls: ['./overall-extimate-statistics.component.css']
})
export class OverallExtimateStatisticsComponent implements OnInit {

  OverallEstimateStatisticsObj: OverallEstimateStatistics
  OverallEstimateStatistics: Array<OverallEstimateStatistics>
  customerObj: Customer;
  statisticsObj: Statistics;

  constructor(private router: Router,private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, 
    private _adminService: AdminSideService) {
  }

  ngOnInit() {
    this.OverallEstimateStatisticsObj = new OverallEstimateStatistics();
    this.OverallEstimateStatistics = new Array<OverallEstimateStatistics>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterOverallEstimateStatistics() {
    this._generalService.filterOverallEstimateStatistics(this.statisticsObj).subscribe((res: any) => {
      this.OverallEstimateStatistics = res.OverallEstimateStatistics;
    }, (error) => {
      this._sharedService.error(error);
    })
  }


  
}

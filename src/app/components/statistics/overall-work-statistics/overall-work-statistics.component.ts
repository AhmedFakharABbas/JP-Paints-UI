import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { OverallWorkStatistics } from '../../../models/overall-work-statistics.model';

@Component({
  selector: 'app-overall-work-statistics',
  templateUrl: './overall-work-statistics.component.html',
  styleUrls: ['./overall-work-statistics.component.css']
})
export class OverallWorkStatisticsComponent implements OnInit {


  OverallWorkStatisticsObj:OverallWorkStatistics
  OverallWorkStatistics:Array<OverallWorkStatistics>;

  customerObj: Customer;
  statisticsObj: Statistics;

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {

    this.OverallWorkStatisticsObj = new OverallWorkStatistics();
    this.OverallWorkStatistics = new Array<OverallWorkStatistics>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }


  onFilterOverallWorkStatistics() {
    this._generalService.filterOverallWorkStatistics(this.statisticsObj).subscribe((res: any) => {
      this.OverallWorkStatistics = res.OverallWorkStatistics;
    }, (error) => {
      this._sharedService.error(error);
    })
  }



}

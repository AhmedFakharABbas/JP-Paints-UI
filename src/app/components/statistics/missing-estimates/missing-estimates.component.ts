import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { MissingEstimates } from '../../../models/missing-estimates.model';

@Component({
  selector: 'app-missing-estimates',
  templateUrl: './missing-estimates.component.html',
  styleUrls: ['./missing-estimates.component.css']
})
export class MissingEstimatesComponent implements OnInit {

  customerObj: Customer;
  statisticsObj: Statistics;
  MissingEstimatesObj: MissingEstimates;
  MissingEstimates: Array<MissingEstimates>;

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {
    this.MissingEstimatesObj = new MissingEstimates();
    this.MissingEstimates = new Array<MissingEstimates>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterMissingEstimates() {
    this._generalService.filterMissingEstimates(this.statisticsObj).subscribe((res: any) => {
      this.MissingEstimates = res.MissingEstimates;
    }, (error) => {
      this._sharedService.error(error);
    })
  }

}

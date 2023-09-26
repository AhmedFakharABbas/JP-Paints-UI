import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { from } from 'rxjs';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { CrewBreakdowns } from '../../../models/crew-breakdowns.model';

@Component({
  selector: 'app-crew-breakdowns',
  templateUrl: './crew-breakdowns.component.html',
  styleUrls: ['./crew-breakdowns.component.css']
})
export class CrewBreakdownsComponent implements OnInit {

  CrewBreakdownsObj: CrewBreakdowns;
  CrewBreakdowns: Array<CrewBreakdowns>;
  customerObj: Customer;
  statisticsObj: Statistics;


  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {
    this.CrewBreakdownsObj = new CrewBreakdowns();
    this.CrewBreakdowns = new Array<CrewBreakdowns>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterCrewBreakdowns() {
    this._generalService.filterCrewBreakdowns(this.statisticsObj).subscribe((res: any) => {
      this.CrewBreakdowns = res.CrewBreakdowns;
    }, (error) => {
      this._sharedService.error(error);
    })
  }


}

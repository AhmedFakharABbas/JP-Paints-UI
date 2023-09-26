import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { WorkByCustomerZipCode } from '../../../models/work-by-customer-zip-code.model';

@Component({
  selector: 'app-work-customer-zipcode',
  templateUrl: './work-customer-zipcode.component.html',
  styleUrls: ['./work-customer-zipcode.component.css']
})
export class WorkCustomerZipcodeComponent implements OnInit {
 
  WorkByCustomerZipCodeObj:WorkByCustomerZipCode
  WorkByCustomerZipCode:Array<WorkByCustomerZipCode>;
  customerObj: Customer;
  statisticsObj: Statistics;

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {

    this.WorkByCustomerZipCodeObj = new WorkByCustomerZipCode();
    this.WorkByCustomerZipCode = new Array<WorkByCustomerZipCode>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterWorkByCustomerZipCode() {
    this._generalService.filterWorkByCustomerZipCode(this.statisticsObj).subscribe((res: any) => {
      this.WorkByCustomerZipCode = res.WorkByCustomerZipCode;
    }, (error) => {
      this._sharedService.error(error);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Statistics } from '../../../models/statistics.model';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { EstimatesByCustomerZipCode } from '../../../models/estimates-by-customer-zip-code.model';


@Component({
  selector: 'app-estimate-customer-zipcode',
  templateUrl: './estimate-customer-zipcode.component.html',
  styleUrls: ['./estimate-customer-zipcode.component.css']
})
export class EstimateCustomerZipcodeComponent implements OnInit {

  customerObj: Customer;
  statisticsObj: Statistics;
  EstimatesByCustomerZipCodeObj:EstimatesByCustomerZipCode
  EstimatesByCustomerZipCode:Array<EstimatesByCustomerZipCode>

  constructor(private router: Router,
    private _generalService: GeneralService, private _route: ActivatedRoute, public _sharedService: SharedService, private _adminService: AdminSideService) {
  }

  ngOnInit() {
    this.EstimatesByCustomerZipCodeObj = new EstimatesByCustomerZipCode();
    this.EstimatesByCustomerZipCode = new Array<EstimatesByCustomerZipCode>();
    this.customerObj = new Customer();
    this.statisticsObj = new Statistics();
  }

  onFilterEstimatesByCustomerZipCode() {
    this._generalService.filterEstimatesByCustomerZipCode(this.statisticsObj).subscribe((res: any) => {
      this.EstimatesByCustomerZipCode = res.EstimatesByCustomerZipCode;
    }, (error) => {
      this._sharedService.error(error);
    })
  }

}

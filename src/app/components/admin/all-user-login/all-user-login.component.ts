import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserLoginDetails } from 'src/app/models/user-login-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { AllUserLoginFilter } from 'src/app/models/all-user-login-filter.model';

@Component({
  selector: 'app-all-user-login',
  templateUrl: './all-user-login.component.html',
  styleUrls: ['./all-user-login.component.css']
})
export class AllUserLoginComponent implements OnInit {

  customerObj: Customer;
  userLoginDetailsObj: UserLoginDetails;
  allUserLoginFilterObj:AllUserLoginFilter;
  userDetails: any
  userLoginDetails: Array<UserLoginDetails>;
  userID: number
  p : number;

  currentPageNo: number = 1;
  total_logins: number;

  constructor(private _adminService: AdminSideService, private route: ActivatedRoute, private router: Router, private _generalService: GeneralService, public _sharedService: SharedService) {
  }

  ngOnInit() {
    this.customerObj = new Customer();
    this.userLoginDetails = new Array<UserLoginDetails>();
    this.allUserLoginFilterObj = new AllUserLoginFilter();
    this.userLoginDetailsObj = new UserLoginDetails();

    this.onGetAllUserLoginDetails();
  }

  onResetResult()
  {
    this.allUserLoginFilterObj = new AllUserLoginFilter();
  }

  onGetAllUserLoginDetails() {
  
    this._generalService.getAllUserLoginDetails(this.allUserLoginFilterObj,this.currentPageNo).subscribe((res: any) => {
      this.userLoginDetails = res.users_login;
      this.total_logins = res.total_logins;
    },
      (error) => {
        this._sharedService.error(error);
      })
  }

  onFilterAllUserLogins() {
    if (this.allUserLoginFilterObj.end_date < this.allUserLoginFilterObj.start_date) {
      this.allUserLoginFilterObj.end_date = this.allUserLoginFilterObj.start_date;
    }
    this._adminService.filterAllUserLogins(this.allUserLoginFilterObj).subscribe((res: any) => {
     this.userLoginDetails = res.filtered_user_logins;
     this.p = 1;
    }, (error) => {
      this._sharedService.error(error);
    })

  }

}

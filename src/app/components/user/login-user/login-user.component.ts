import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { SharedService } from 'src/app/services/shared.service';
import { UserLoginDetails } from 'src/app/models/user-login-details.model';
import { GeneralService } from 'src/app/services/general.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  customerObj: Customer;
  userLoginDetailsObj: UserLoginDetails;
  userDetails: any
  userLoginDetails: any
  userID: number
  p: number;

  constructor(private route: ActivatedRoute, private router: Router, private _generalService: GeneralService, public _sharedService: SharedService) {
  }

  ngOnInit() {
    this.customerObj = new Customer();
    this.userLoginDetailsObj = new UserLoginDetails();
    this.route.params.subscribe((params) => {
      this.userID = +params['id']; // (+) converts string 'id' to a number
      if (this.userID != undefined && this.userID != 0 && !isNaN(this.userID))
      this.onGetAllUserLoginDetails(this.userID);
      else {
        this.userID = 0;
      }
    });
  }

  onGetAllUserLoginDetails(id:number) {
    
   
    this._generalService.getUserLoginDetails(id).subscribe((res: any) => {
      this.userLoginDetails = res.userlogindetails;
    },
      (error) => {
        this._sharedService.error(error);
      })
  }



}

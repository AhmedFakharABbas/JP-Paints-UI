import { GeneralService } from './../../../services/general.service';
import { SharedService } from './../../../services/shared.service';
import { CustomHttpService } from './../../../services/custom-http.service';
import { User } from './../../../models/user.model';
import { UserLoginDetails } from './../../../models/user-login-details.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
import { RoleFlag } from 'src/app/models/role-flag';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userObj: User;
  loggedInuserId: number;
  userLoginDetailsObj: UserLoginDetails
  userDetailsArrayContainer: any

  constructor(private router: Router, private _customService: CustomHttpService, private _generalService: GeneralService,
    public _sharedService: SharedService) {
  }

  ngOnInit() {
    this.userObj = new User();
    this.userLoginDetailsObj = new UserLoginDetails();
    this._sharedService.userDetailsArray = new Array<UserLoginDetails>();
  }

  OnSubmit(loginForm: NgForm) {
    //token request to the web api project
    this._customService.signin(this.userObj).subscribe((data: any) => {
      
      //upon success access-token will be returened and stored in data going to store the access_token in client web browser here
      this._sharedService.token = data.access_token;
      this.loggedInuserId = data.user.id;
      this.userLoginDetailsObj = data.userlogindetails;
      this._sharedService.userObj = data.user;
      localStorage.setItem('userObj', JSON.stringify(data.user));
      this._sharedService.userDetailsArray.push(this.userLoginDetailsObj);

      this._sharedService.logged_user_roles = data.user_roles;
      localStorage.setItem('logged_user_roles',JSON.stringify(this._sharedService.logged_user_roles)); 
      
      this._sharedService.role_flags = new RoleFlag();

      this._sharedService.logged_user_roles.forEach(element =>{
        if(element.id == 1)
        {
          this._sharedService.role_flags.is_accountant = true;
        }
        if(element.id == 2)
        {
          this._sharedService.role_flags.is_administrator = true;
        }
        if(element.id == 3)
        {
          this._sharedService.role_flags.is_coordinator = true;
        }
        if(element.id == 1)
        {
          this._sharedService.role_flags.is_crew_leader = true;
        }
        if(element.id == 1)
        {
          this._sharedService.role_flags.is_estimator = true;
        }
      })

      localStorage.setItem('role_flags',JSON.stringify(this._sharedService.role_flags)); 


      localStorage.setItem('userdetails', JSON.stringify(this._sharedService.userDetailsArray));

      this._sharedService.currentUserFullName = data.first_name + " " + data.last_name;
      localStorage.setItem('userFullName', this._sharedService.currentUserFullName);

      localStorage.setItem('loggedInUserID', JSON.stringify(this.loggedInuserId));

      localStorage.setItem('userToken', this._sharedService.token);

      this._customService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
      // this._sharedService.success('Logged in successfully');
      this.router.navigate(['/todo/task']);
    },
      (err: HttpErrorResponse) => {
        loginForm.resetForm({email : this.userObj.userName,password: this.userObj.password});
        this._sharedService.error(err.message);
      });
  }
}

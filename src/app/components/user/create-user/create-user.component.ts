import { Component, OnInit } from "@angular/core";
import $ from "jquery";
import { Customer } from "src/app/models/customer";
import { NgForm } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { UserAdministration } from "src/app/models/user-administration.model";
import { GeneralService } from "src/app/services/general.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRoles } from "src/app/models/user-roles.model";
import { element } from "protractor";
@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"],
})
export class CreateUserComponent implements OnInit {
  userAdministrationObj: UserAdministration;
  userID: number;
  userTypesMeta: Array<UserRoles>;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public _customerService: CustomerService,
    public _sharedService: SharedService,
    private _generalService: GeneralService
  ) {}

  ngOnInit() {
    this.userAdministrationObj = new UserAdministration();
    // this.userAdministrationObj.roles = new Array<number>();
    this.onGetUserMeta();
    this.route.params.subscribe((params) => {
      this.userID = +params["id"]; // (+) converts string 'id' to a number
      if (this.userID != undefined && this.userID != 0 && !isNaN(this.userID))
        this.onGetUser(this.userID);
      else {
        this.userID = 0;
      }
    });
  }

  comparer(o1: UserRoles, o2: UserRoles): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.name === o2.name : o2 === o2;
  }

  onGetUser(id: number) {
    this._generalService.getUser(id).subscribe(
      (res: any) => {
        this.userAdministrationObj = res.user;
        this.userAdministrationObj.roles = res.user_roles;
      },
      (err) => {
        this._sharedService.error(err);
      }
    );
  }

  onEditUser() {
    this.userAdministrationObj.password =
      this.userAdministrationObj.password == ""
        ? undefined
        : this.userAdministrationObj.password;
    this._generalService.updateUser(this.userAdministrationObj).subscribe(
      (res: any) => {
        this._sharedService.success("User Updated Successfully");
        this.router.navigate(["/user/all"]);
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  onCreateUser() {
    this.userAdministrationObj.is_active = true;
    this._generalService.createUser(this.userAdministrationObj).subscribe(
      (res: any) => {
        this.router.navigate(["/user/all"]);
        this._sharedService.success(res.success);
      },
      (error) => {
        // this.userAdministrationObj.roles = tempArray;
        this._sharedService.error(error.error);
      }
    );
  }

  onGetUserMeta() {
    this._generalService.getUserMeta().subscribe((res: any) => {
      this.userTypesMeta = res.user_types;
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }
}

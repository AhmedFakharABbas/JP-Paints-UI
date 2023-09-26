import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Customer } from "src/app/models/customer";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { GeneralService } from "src/app/services/general.service";
import { UserLoginDetails } from "src/app/models/user-login-details.model";
import { UserAdministration } from "src/app/models/user-administration.model";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.css"],
})
export class AllUsersComponent implements OnInit {
  is_active: false;
  tempIDArray: Array<number>;
  tempPasswordArray: Array<string>;
  userLoginDetailsObj: UserLoginDetails;
  activetedMOdalRef: NgbModalRef;
  userAdministrationObj: UserAdministration;
  activeUserDetails: Array<UserAdministration>;
  inActiveUserDetails: Array<UserAdministration>;
  userTypesMeta;
  userLoginDetails;
  customerObj: Customer;
  userId: number;
  inActiveCurrentPageNo: number;
  // inActivePreviousPageNo: number;
  totalActiveUserCount: number;
  totalInActiveUserCount: number;
  ActiveCurrentPageNo: number;
  // ActivePreviousPageNo: number;
  ActivetotalUserCount: number;
  p: number;
  q: number;
  userSearchQuery: string;

  constructor(
    public _generalService: GeneralService,
    public _modalService: NgbModal,
    public _customerService: CustomerService,
    public _sharedService: SharedService
  ) {
    this.customerObj = new Customer();
  }

  ngOnInit() {
    this.tempIDArray = new Array<number>();
    this.tempPasswordArray = new Array<string>();
    this.userLoginDetailsObj = new UserLoginDetails();
    this.userAdministrationObj = new UserAdministration();
    this.activeUserDetails = new Array<UserAdministration>();
    this.inActiveUserDetails = new Array<UserAdministration>();
    this.inActiveCurrentPageNo = 1;
    this.ActiveCurrentPageNo = 1;
    this.onGetAllUsers();
  }

  toggleIsActiveUser(id: number) {
    this.activeUserDetails.forEach((element) => {
      if (element.id == id) {
        element.is_active = !element.is_active;
        this.userAdministrationObj.is_active = element.is_active;
        this.userAdministrationObj.id = id;
        this._generalService
          .updateIsActiveUser(this.userAdministrationObj, id)
          .subscribe(
            (res: any) => {},
            (error) => {
              this._sharedService.error(error);
            }
          );
      }
    });
    // this.userDetails.is_active = !this.userDetails.is_active;
  }

  onGetAllUsers() {
    this.userSearchQuery ? undefined : "";
    this._generalService
      .getUsers(
        this.userSearchQuery,
        this.ActiveCurrentPageNo,
        this.inActiveCurrentPageNo
      )
      .subscribe(
        (res: any) => {
          this.activeUserDetails = res.activeUsers;
          this.inActiveUserDetails = res.InactiveUsers;
          // console.log(this.userDetails);

          this.totalActiveUserCount = res.activeUserAcount;
          this.totalInActiveUserCount = res.inActiveAcount;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  onUpdateAllUsers() {
    this._generalService.updateUsers(this.userAdministrationObj).subscribe(
      (res: any) => {
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  onDeleteUser(id: number) {
    this.activetedMOdalRef.close();
    this._generalService.deleteUser(id).subscribe((res: any) => {
      this.ngOnInit();
      this.p = 1;
      this.q = 1;
      this._sharedService.success(res.success);
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  openDeleteUserModal(modal: any, user_id: number) {
    this.userId = user_id;
    this.activetedMOdalRef = this._modalService.open(modal);
  }
  userSearch() {
    this.inActiveCurrentPageNo = 1;
    this.ActiveCurrentPageNo = 1;
    if (this.userSearchQuery != undefined) {
      this._generalService
        .getUsers(
          this.userSearchQuery,
          this.ActiveCurrentPageNo,
          this.inActiveCurrentPageNo
        )
        .subscribe(
          (res: any) => {
            this.activeUserDetails = res.activeUsers;
            this.inActiveUserDetails = res.InactiveUsers;
            // console.log(this.userDetails);

            this.totalActiveUserCount = res.activeUserAcount;
            this.totalInActiveUserCount = res.inActiveAcount;
          },
          (error) => {
            this._sharedService.error(error);
          }
        );
    }
  }
}

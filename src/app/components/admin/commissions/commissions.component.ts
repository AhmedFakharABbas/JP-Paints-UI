import { AdminSideService } from "src/app/services/admin-side.service";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "src/app/services/shared.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-commissions",
  templateUrl: "./commissions.component.html",
  styleUrls: ["./commissions.component.css"],
})
export class CommissionsComponent implements OnInit {
  ngOnInit() {
    this.getAllUsers();
    this.userObj = new User();
    this.users = new Array<User>();
  }

  isShowCommissionValue: boolean = false;
  activetedMOdalRef: NgbModalRef;
  userObj: User;

  p: number;
  users: Array<User>;
  userId: number;
  constructor(
    public _modalService: NgbModal,
    public _adminSideService: AdminSideService,
    public _sharedService: SharedService
  ) {
    this.userObj = new User();
  }

  toggle() {
    this.isShowCommissionValue = !this.isShowCommissionValue;
  }
  // isShowCommissionValue=false

  getAllUsers() {
    this._adminSideService.getAllUsers().subscribe((res: any) => {
      this.users = res.users;
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  getCommissions() {
    this._adminSideService.getPaintBrands().subscribe((res: any) => {
      this.users = res;
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  updateUserComission(id: number, commission: string) {
    this.userId = id;
    this.userObj.id = this.userId;
    this.userObj.commission = commission;
    this._adminSideService
      .updateUserCommission(this.userObj)
      .subscribe((res: any) => {
        // this.activetedMOdalRef.dismiss('dismiss');
        this.isShowCommissionValue = false;
        var index = this.users.findIndex((item) => item.id == this.userObj.id);
        if (index > -1) {
          // this.users[index] = this.userObj;
        }

        this.userObj = new User();
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  openUserComission(modal: any, user: User) {
    this.userId = user.id;
    var data = JSON.stringify(user);
    this.userObj = new User();
    this.userObj = JSON.parse(data);
    this.activetedMOdalRef = this._modalService.open(modal);
  }
}

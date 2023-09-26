import { Calendar } from "./../../../models/calendar";
import { UserAdministration } from "./../../../models/user-administration.model";
import { AdminSideService } from "./../../../services/admin-side.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { threadId } from "worker_threads";
import { SharedService } from "src/app/services/shared.service";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-edit-calendars",
  templateUrl: "./edit-calendars.component.html",
  styleUrls: ["./edit-calendars.component.css"],
})
export class EditCalendarsComponent implements OnInit {
  calendarId: number;
  allUsers: Array<UserAdministration>;
  calendarObj: Calendar;
  userObj: UserAdministration;
  currentUsersArray: Array<UserAdministration>;
  currentUserObj: UserAdministration;
  manage_user_id: any;
  p: number;
  q: number;

  constructor(
    private _route: ActivatedRoute,
    private _adminSideService: AdminSideService,
    public _sharedService: SharedService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.calendarObj = new Calendar();
    this.currentUserObj = new UserAdministration();
    this.currentUsersArray = new Array<UserAdministration>();
    this.calendarObj.calendarUsers = new Array<UserAdministration>();

    this._route.params.subscribe((param) => {
      this.calendarId = +param["calendarId"];

      if (this.calendarId != 0) {
        this.onGetCalendarUsers();
        this.calendarObj.id = this.calendarId;
      }
    });

    this.allUsers = new Array<UserAdministration>();
    // if (this.calendarId == undefined || isNaN(this.calendarId)) {
    //   this.calendarId = 0;
    // }
    this.onGetCalendarMeta();
  }

  // getCalendarData() {
  //   this._adminSideService.getCalendarData(this.calendarId).subscribe((res: any) => {
  //     this.allUsers = res.users;
  //     this.calendarObj = res.calendar;
  //   }),
  //     error => {
  //       this._sharedService.error(error);
  //     }
  // }

  onGetCalendarMeta() {
    this._adminSideService.getCalendarMeta(this.calendarId).subscribe(
      (res: any) => {
        this.allUsers = res.users;
        // this.calendarObj = res.calendar;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetCalendarUsers() {
    this._adminSideService
      .getCalendarUsers(this.calendarId, this._sharedService.userObj.id)
      .subscribe(
        (res: any) => {
          // this.allUsers = res.calendar_users;
          this.calendarObj.calendarUsers = res.calendar_users;
          this.calendarObj.name = res.calendar_user_name[0].name;
          // this.calendarObj.name = res.calendar_users.name;
          // this.calendarObj = res.calendar;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  onSaveCalendar() {
    // if (this.calendarObj.calendarUsers != undefined && this.calendarObj.calendarUsers.length > 0) {
    //   this.calendarObj.calendarUsers.forEach(element => {
    //     this.currentUserObj.id = element.id;
    //     this.currentUsersArray.push(this.currentUserObj);
    //     this.currentUserObj = new UserAdministration();
    //   });
    // }

    this._adminSideService.addCalendar(this.calendarObj).subscribe(
      (res: any) => {
        this.calendarId = res.id;
        this._router.navigate(["/admin/manage-calenders"]);
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onUpdatecalendar() {
    this._adminSideService.updateCalendar(this.calendarObj).subscribe(
      (res: any) => {
        this._router.navigate(["/admin/manage-calenders"]);
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  // calendarObj.calendarUsers
  onAddUserToCalander(userId: number) {
    var index = this.allUsers.findIndex((item) => item.id == userId);
    this.userObj = this.allUsers[index];
    this.allUsers.splice(index, 1);
    if (this.calendarObj.calendarUsers == undefined) {
      this.calendarObj.calendarUsers = new Array<UserAdministration>();
    }

    // var calender_user_obj: UserAdministration;
    // calender_user_obj = new UserAdministration();
    // calender_user_obj.user_id = this.userObj.id;
    // calender_user_obj.role_name = this.userObj.role_name;
    // calender_user_obj.first_name =  this.userObj.first_name;
    // calender_user_obj.last_name = this.userObj.last_name;
    // calender_user_obj.email = this.userObj.email;

    this.calendarObj.calendarUsers.push(this.userObj);
    this.userObj = new UserAdministration();
  }

  onRemoveUserFromCalander(userId: number) {
    var index = this.calendarObj.calendarUsers.findIndex(
      (item) => item.id == userId
    );
    this.userObj = this.calendarObj.calendarUsers[index];
    this.calendarObj.calendarUsers.splice(index, 1);

    this.p = 1;

    if (this.userObj.user_id > 0) {
      this._adminSideService.deletecurrentuser(userId).subscribe(
        (res: any) => {
          this._sharedService.success(res.success);
        },
        (error) => {
          if (error.error != null) {
            index = 0;
          }
          this._sharedService.error(error.error);
        }
      );
    }

    if (this.allUsers == undefined) {
      this.allUsers = new Array<UserAdministration>();
    }

    this.allUsers.push(this.userObj);
    this.userObj = new UserAdministration();
  }

  onMoveUserUp(userId: number) {
    var curr_index = this.calendarObj.calendarUsers.findIndex(
      (item) => item.id == userId
    );
    this.calendarObj.calendarUsers = this.moveArrayObject(
      this.calendarObj.calendarUsers,
      curr_index,
      curr_index - 1
    );
  }

  onMoveUserDown(userId: number) {
    var curr_index = this.calendarObj.calendarUsers.findIndex(
      (item) => item.id == userId
    );
    if (
      curr_index != undefined &&
      (curr_index + 1 != undefined || curr_index + 1 != null) &&
      curr_index < this.calendarObj.calendarUsers.length - 1
    ) {
      this.calendarObj.calendarUsers = this.moveArrayObject(
        this.calendarObj.calendarUsers,
        curr_index,
        curr_index + 1
      );
    }
  }

  moveArrayObject(arr, curr_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(curr_index, 1)[0]);
    return arr; // for testing
  }
}

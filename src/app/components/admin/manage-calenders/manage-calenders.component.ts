import { Calendar } from "./../../../models/calendar";
import { AdminSideService } from "src/app/services/admin-side.service";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-manage-calenders",
  templateUrl: "./manage-calenders.component.html",
  styleUrls: ["./manage-calenders.component.css"],
})
export class ManageCalendersComponent implements OnInit {
  activeModelRef: NgbModalRef;
  calendarsArry: Array<Calendar>;
  calendarId: number;
  p: number;
  constructor(
    public _modalService: NgbModal,
    private _adminSideService: AdminSideService,
    public _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.calendarsArry = new Array<Calendar>();
    this.getCalendars();
  }

  getCalendars() {
    this._adminSideService.getCalendarNames().subscribe((res: any) => {
      this.calendarsArry = res.calendars;
      console.log(this.calendarsArry);
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  deleteCalendar() {
    this._adminSideService
      .deletecalendar(this.calendarId)
      .subscribe((res: any) => {
        this.activeModelRef.close();
        this.p = 1;
        var index = this.calendarsArry.findIndex(
          (item) => item.id == this.calendarId
        );
        if (index > -1) {
          this.calendarsArry.splice(index, 1);
        }
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  opendeleteManageCalendars(modal: string, id: number) {
    this.calendarId = id;
    this.activeModelRef = this._modalService.open(modal);
  }
}

import { Component, OnInit } from "@angular/core";
import {
  NgbModal,
  NgbModalRef,
  NgbDateStruct,
  NgbCalendar,
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import * as $ from "jquery";
import { ScheduleBulkCallsModalComponent } from "src/app/modals/schedule-bulk-calls-modal/schedule-bulk-calls-modal.component";
import { PhoneCall } from "src/app/models/phone-call.model";
import { AdminSideService } from "src/app/services/admin-side.service";
import { SharedService } from "src/app/services/shared.service";
import { GeneralService } from "src/app/services/general.service";
import { Project } from "src/app/models/project";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-schedule-bulk-calls",
  templateUrl: "./schedule-bulk-calls.component.html",
  styleUrls: ["./schedule-bulk-calls.component.css"],
})
export class ScheduleBulkCallsComponent implements OnInit {
  activetedModalRef: NgbModalRef;
  model: NgbDateStruct;
  date: { year: number; month: number };
  callCount: number = 0;
  phoneCallObj: PhoneCall;
  projects: Array<Project>;
  call_id: number;
  isSelected: boolean = false;
  isAllSelected: boolean = false;
  users: Array<User>;
  p: number;

  constructor(
    private calendar: NgbCalendar,
    public _modalService: NgbModal,
    private _generalService: GeneralService,
    private _adminService: AdminSideService,
    public _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.phoneCallObj = new PhoneCall();
    this.projects = new Array<Project>();
    this.phoneCallObj.phone_call_array = new Array();
    this.users = new Array<User>();
    this.onGetProjectsToAssignCalls();
  }

  onGetProjectsToAssignCalls() {
    this._adminService.getProjects().subscribe(
      (res: any) => {
        this.projects = res.projects;
        this.users = res.users;
        localStorage.setItem("setProjectArray", JSON.stringify(this.projects));
      },
      (err) => {
        this._sharedService.error(err);
      }
    );
  }

  onChange(project_id: number, isChecked: boolean) {
    if (isChecked) {
      this.phoneCallObj.phone_call_array.push(project_id);
      // for (var i = 0; i <= this.phoneCallObj.phone_call_array.length; i++) {
      this.callCount += 1;
      // }
    } else {
      let index = this.phoneCallObj.phone_call_array.indexOf(project_id);
      this.phoneCallObj.phone_call_array.splice(index, 1);
      this.callCount -= 1;
    }
  }

  onSelectAll(flag: boolean) {
    this.phoneCallObj.phone_call_array = new Array();

    if (flag == true) {
      this.projects.forEach((element, index) => {
        this.phoneCallObj.phone_call_array.push(element.id);
        this.callCount = this.phoneCallObj.phone_call_array.length;
      });
    } else {
      this.callCount = 0;
    }
  }

  openBulkCallsModel(modal: any) {
    // this.call_id = callId;
    this.activetedModalRef = this._modalService.open(modal, {
      size: "lg",
      centered: true,
    });
  }

  onScheduleBulkPhoneCalls() {
    this.phoneCallObj.scheduled_by = this._sharedService.userObj.id;
    this._generalService.scheduleBulkPhoneCall(this.phoneCallObj).subscribe(
      (res: any) => {
        this.activetedModalRef.close();
        this._sharedService.success(res.success);
      },
      (err) => {
        this._sharedService.error(err.message);
      }
    );
  }
}

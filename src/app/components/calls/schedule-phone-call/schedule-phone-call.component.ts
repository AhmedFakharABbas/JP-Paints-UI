import { Component, OnInit } from "@angular/core";
import { PhoneCall } from "src/app/models/phone-call.model";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { GeneralService } from "src/app/services/general.service";
import { SharedService } from "src/app/services/shared.service";
import * as $ from "jquery";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  catchError,
} from "rxjs/operators";
import { Customer } from "src/app/models/customer";
import { FormControl, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AdminSideService } from "src/app/services/admin-side.service";
import { SearchProject } from "src/app/models/search-project.model";

@Component({
  selector: "app-schedule-phone-call",
  templateUrl: "./schedule-phone-call.component.html",
  styleUrls: ["./schedule-phone-call.component.css"],
})
export class SchedulePhoneCallComponent implements OnInit {
  customerProjects: Array<any>;
  phoneCallObj: PhoneCall;
  phoneCallsId: number;
  customersDetails: Array<Customer>;
  userFname: any;
  projectsDetails: any;
  estimatorDetail: any;
  userDetails: any;
  list: any;
  customerDetailsObj: Object;
  myControl: FormControl;
  customer_id: number;
  phoneCallsArray: Array<PhoneCall>;
  customerID: number;
  //customer search
  customerSearch$ = new FormControl();
  searchCustomers$: Observable<any[]>;
  //project search
  projectSearch$ = new FormControl();
  searchProjects$: Observable<any[]>;
  //Assigin to user search
  assignedToSearch$ = new FormControl();
  assignedToProjects$: Observable<any[]>;

  //test
  searchProjectObj: SearchProject;
  searchCustomersLength: any;
  isCustomerLoading: boolean;

  constructor(
    public route: ActivatedRoute,
    public _generalService: GeneralService,
    public _sharedService: SharedService,
    private _router: Router,
    public _adminService: AdminSideService
  ) {}

  ngOnInit() {
    this.customersDetails = new Array<Customer>();
    this.customerDetailsObj = new Object();
    this.phoneCallObj = new PhoneCall();
    this.myControl = new FormControl();
    this.customerProjects = new Array<any>();
    this.phoneCallsArray = new Array<PhoneCall>();

    // this.customersDetails = new Array<any>();
    //test
    this.searchProjectObj = new SearchProject();
    // this.onGetCustomersProjectsMeta();

    this.customer_id =
      this.route.snapshot.queryParams["queryParam"] != undefined
        ? parseInt(this.route.snapshot.queryParams["queryParam"])
        : undefined;
    //get the customers
    this.customerSearch$.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.phoneCallObj.customer_detail_obj.id == undefined;
      }
      if (value.length >= 2) {
        debugger;
        this.isCustomerLoading = true;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "customers",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.searchCustomers$ = response.search_result;
            this.searchCustomersLength = response.search_result.length;
            this.isCustomerLoading = false;
          });
      } else {
        return null;
      }
    });
    //get the projects
    this.projectSearch$.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.phoneCallObj.project_id = undefined;
      }
      if (value.length >= 1) {
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "projects",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            console.log(response);
            this.searchProjects$ = response.search_result;
          });
      } else {
        return null;
      }
    });
    //get the ussers to assign Project
    this.assignedToSearch$.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.phoneCallObj.assigned_to = undefined;
      }
      if (value.length >= 2) {
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "users",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            console.log(response);
            this.assignedToProjects$ = response.search_result;
          });
      } else {
        return null;
      }
    });
  }

  formatter = (result: any) => {
    var idx = -1;
    if (result != undefined && result.id != undefined) {
      idx = this.customersDetails.findIndex((item) => item.id == result.id);
    } else {
      idx = this.customersDetails.findIndex((item) => item.id == result);
    }
    if (idx > -1) {
      return (
        this.customersDetails[idx].first_name +
        " " +
        this.customersDetails[idx].last_name +
        " (" +
        this.customersDetails[idx].id +
        ")"
      );
    } else {
      return "";
    }
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.customersDetails
              .filter(
                (v) =>
                  v.first_name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  onSchedulePhoneCall(form: NgForm) {
    if (this.phoneCallObj.customer_detail_obj != undefined) {
      // this.customerDetailsObj = this.phoneCallObj.customer_detail_obj.first_name + " " + this.phoneCallObj.customer_detail_obj.last_name + " (" + this.phoneCallObj.customer_detail_obj.id + ") ";
      this.customerDetailsObj = this.phoneCallObj.customer_detail_obj.id;
      this.customer_id = this.phoneCallObj.customer_detail_obj.id;
    }

    this.phoneCallObj.customer_detail_obj = this.customerDetailsObj;
    this.customer_id = this.phoneCallObj.customer_detail_obj;
    this.phoneCallObj.scheduled_by = this._sharedService.userObj.id;

    // localStorage.setItem("getCustomerID", JSON.stringify(this.customer_id));
    // this.userFname = localStorage.getItem('userFullName');
    // this.phoneCallObj.scheduled_by = this.userFname;
    // this.phoneCallObj.customer_id = this.phoneCallObj.customer_detail_obj.id;

    this._generalService.schedulePhoneCall(this.phoneCallObj).subscribe(
      (res: any) => {
        this.resetForm(form);
        this._sharedService.success(res.success);
        this._sharedService.phoneCallsDetailID = res.phone_calls_detail_id;
        localStorage.setItem(
          "phoneCallsDetailID",
          JSON.stringify(this._sharedService.phoneCallsDetailID)
        );
        this._router.navigate(["/calls"]);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetProjectsOfCustomers() {
    if (
      this.phoneCallObj.customer_detail_obj != undefined &&
      this.phoneCallObj.customer_detail_obj.id != undefined
    ) {
      this.customer_id = +this.phoneCallObj.customer_detail_obj.id;
      this._generalService.getProjectsOfCustomers(this.customer_id).subscribe(
        (res: any) => {
          this.projectsDetails = res.projects;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
    }
  }

  onGetCustomersProjectsMeta() {
    this._generalService.getCustomersProjectsMeta().subscribe(
      (res: any) => {
        this.customersDetails = res.customers;
        this.projectsDetails = res.projects;
        if (this.customer_id != undefined) {
          this.phoneCallObj.customer_detail_obj = this.customersDetails.find(
            (item) => item.id == this.customer_id
          );
        }
        // this.projectsDetails = res.projects;
        this.userDetails = res.users;

        // if (this.phoneCallObj.customer_detail_obj != undefined && this.phoneCallObj.customer_detail_obj != null && this.phoneCallObj.customer_detail_obj.length > 0) {
        //   this.onGetProjectsOfCustomers();
        // }
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }
  optionClicked(event: Event, type: string, id: number, customer) {
    // this.phoneCallObj=customer;
    if (customer != undefined || customer != null) {
      this.phoneCallObj.customer_detail_obj = customer;
    }

    // this.toggleSelection(type,id);
    // if(type == 'estimator')
    // {
    //   this.searchProjectObj.estimator_id = id;
    // }
    // else
    // {
    //   this.searchProjectObj.crew_id = id;
    // }

    // console.log(this.searchProjectObj.estimator_id)
  }
  projectAutoCompClick(id: number) {
    if (id != undefined || id != null) {
      this.phoneCallObj.project_id = id;
    }
  }
  assignedToClick(id: number) {
    if (id != undefined || id != null) {
      this.phoneCallObj.assigned_to = id;
    }
  }
  // onGetUserFullNameMeta() {
  //
  //   this._generalService.getUserFullNameMeta().subscribe((res: any) => {
  //     this.userFullName = res.full_name;
  //   }, (error) => {
  //     this._sharedService.error(error);
  //   })
  // }
  // getUserFullNameMeta
  // getCustomerEstimatorsMeta
}

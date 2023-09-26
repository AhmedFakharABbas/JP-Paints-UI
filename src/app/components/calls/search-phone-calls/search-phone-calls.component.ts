import { Component, OnInit } from "@angular/core";
import { PhoneCall } from "src/app/models/phone-call.model";
import { GeneralService } from "src/app/services/general.service";
import { SharedService } from "src/app/services/shared.service";
import { UserAdministration } from "src/app/models/user-administration.model";
import { SearchPhoneCalls } from "src/app/models/search-phone-calls.models";
import { FormControl, NgForm } from "@angular/forms";
import { Observable } from "rxjs";
@Component({
  selector: "app-search-phone-calls",
  templateUrl: "./search-phone-calls.component.html",
  styleUrls: ["./search-phone-calls.component.css"],
})
export class SearchPhoneCallsComponent implements OnInit {
  phoneCallObj: PhoneCall;
  searchPhoneCallsObj: SearchPhoneCalls;
  phoneCalls: Array<any>;
  users: Array<any>;
  user_types: Array<any>;
  call_statuses: Array<any>;
  crews: Array<UserAdministration>;
  estimators: Array<UserAdministration>;

  p: any;
  //sheduled by search
  customerSearch = new FormControl();
  searchUsers: Observable<any[]>;
  //Assigned to  search
  assignToSearch = new FormControl();
  searchAssigntoUsers: Observable<any[]>;
  //sheduled by search
  estimatorSearch = new FormControl();
  Searchestimators: Observable<any[]>;
  //Assigned to  search
  crew = new FormControl();
  SearchesCrew: Observable<any[]>;

  constructor(
    public _sharedService: SharedService,
    private _generalService: GeneralService
  ) {}

  ngOnInit() {
    this.phoneCallObj = new PhoneCall();
    this.searchPhoneCallsObj = new SearchPhoneCalls();
    this.phoneCalls = new Array<any>();
    this.users = new Array<any>();
    this.user_types = new Array<any>();
    this.call_statuses = new Array<any>();
    this.crews = new Array<UserAdministration>();
    this.estimators = new Array<UserAdministration>();
    //get user for search
    this.customerSearch.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.searchPhoneCallsObj.scheduled_by = undefined;
      }
      if (value.length >= 2) {
        debugger;
        this._generalService
          .getUserSearchByKeyWords(
            value,
            "users",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            // console.log(response);
            this.searchUsers = response.search_result;
          });
      } else {
        return null;
      }
    });
    //get user for assigned to
    this.assignToSearch.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.searchPhoneCallsObj.assigned_to_user = undefined;
      }
      if (value.length >= 2) {
        debugger;
        this._generalService
          .getUserSearchByKeyWords(
            value,
            "users",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.searchAssigntoUsers = response.search_result;
          });
      } else {
        return null;
      }
    });
    //get Estimators
    this.estimatorSearch.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.searchPhoneCallsObj.estimator = undefined;
      }
      if (value.length >= 2) {
        debugger;
        this._generalService
          .getUserSearchByKeyWords(
            value,
            "estimator",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.Searchestimators = response.search_result;
          });
      } else {
        return null;
      }
    });
    //get crew
    this.crew.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.searchPhoneCallsObj.crew = undefined;
      }
      if (value.length >= 2) {
        this._generalService
          .getUserSearchByKeyWords(
            value,
            "crew",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.SearchesCrew = response.search_result;
          });
      } else {
        return null;
      }
    });
    this.onGetSearchPhoneCallsDropdownData();
  }

  onGetPhoneCallsSearchFilterMeta() {
    this._generalService
      .getPhoneCallSearchFilterMeta(this.searchPhoneCallsObj)
      .subscribe(
        (res: any) => {
          this.phoneCalls = res.searchResult;
        },
        (error) => {
          this._sharedService.error(error + "error occurred");
        }
      );
  }

  onGetSearchPhoneCallsDropdownData() {
    this._generalService.getPhoneCallSearchDropdownData().subscribe(
      (res: any) => {
        this.users = res.users;
        this.user_types = res.user_types;
        this.call_statuses = res.call_statuses;
        this.crews = res.crews;
        this.estimators = res.estimators;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onResetForm() {
    this.searchPhoneCallsObj = new SearchPhoneCalls();
  }
  userOptionClicked(id: number) {
    this.searchPhoneCallsObj.scheduled_by = id;
  }
  assiginUserOptionClicked(id: number) {
    this.searchPhoneCallsObj.assigned_to_user = id;
  }

  assiginCrewOptionClicked(id: number) {
    this.searchPhoneCallsObj.crew = id;
  }
  assiginEstimatorOptionClicked(id: number) {
    this.searchPhoneCallsObj.assigned_to_user = id;
  }
}

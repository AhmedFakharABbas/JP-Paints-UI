import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { SharedService } from 'src/app/services/shared.service';
import { GeneralService } from 'src/app/services/general.service';
import { SearchUnscheduledPhoneCalls } from 'src/app/models/search-unscheduled-phone-calls.models';
import { Customer } from 'src/app/models/customer';
import { Project } from 'src/app/models/project';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-unschedule-phone-calls',
  templateUrl: './search-unschedule-phone-calls.component.html',
  styleUrls: ['./search-unschedule-phone-calls.component.css']
})
export class SearchUnschedulePhoneCallsComponent implements OnInit {

  project_types: Array<string>;
  project_statuses: Array<string>;
  project_potentials: Array<string>;
  estimators: Array<string>;
  crews: Array<string>;
  SearchUnscheduledPhoneCallsObj: SearchUnscheduledPhoneCalls
  unScheduledCustomers: Array<Customer>;
  unScheduledProjects: Array<Project>;
  isHideFields: Boolean = false;

  constructor(public _sharedService: SharedService, private _generalService: GeneralService) { }

  ngOnInit() {
    this.SearchUnscheduledPhoneCallsObj = new SearchUnscheduledPhoneCalls();
    this.unScheduledCustomers = new Array<Customer>();
    this.unScheduledProjects = new Array<Project>();
    this.project_types = new Array<string>();
    this.project_statuses = new Array<string>();
    this.project_potentials = new Array<string>();
    this.estimators = new Array<string>();
    this.crews = new Array<string>();
    this.getProjectsMetaForUnscheduledCalls();
  }

  getUnScheduledPhoneCallsCustomers() {
    this._generalService.getUnScheduledPhoneCallsCustomers(this.SearchUnscheduledPhoneCallsObj).subscribe((res: any) => {
      this.unScheduledCustomers = res.unScheduledCustomers;
      this.unScheduledProjects = new Array<Project>();
    }, (error) => {
      this._sharedService.error(error.message);
    })
  }

  getUnScheduledPhoneCallsProjects() {
    this._generalService.getUnScheduledPhoneCallsProjects(this.SearchUnscheduledPhoneCallsObj).subscribe((res: any) => {
      this.unScheduledProjects = res.unScheduledProjects;
      this.unScheduledCustomers = new Array<Customer>();
    }, (error) => {
      this._sharedService.error(error.message);
    })
  }

  getProjectsMetaForUnscheduledCalls() {
    this._generalService.getProjectsMetaForUnscheduledCalls().subscribe((res: any) => {
      this.project_types = res.project_types;
      this.project_statuses = res.project_statuses;
      this.project_potentials = res.project_potentials;
      this.estimators = res.estimators;
      this.crews = res.crews;
    }, (error) => {
      this._sharedService.error(error.message);
    })
  }

}

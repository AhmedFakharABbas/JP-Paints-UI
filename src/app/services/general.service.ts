import { Injectable } from "@angular/core";
import { CustomHttpService } from "./custom-http.service";
import { Task } from "../models/task";
import { PhoneCall } from "../models/phone-call.model";
import { Customer } from "../models/customer";
import { UserAdministration } from "../models/user-administration.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserLoginDetails } from "../models/user-login-details.model";
import { UserManageAccess } from "../models/user-manage-access.model";
import { AuthorizeCity } from "../models/authorize-city.model";
import { AuthorizeZipCode } from "../models/authorize-zip-code.model";
import { PhoneCallsDetail } from "../models/phone-calls-detail.model";
import { Calendars } from "../models/calendars.model";
import { SearchPhoneCalls } from "../models/search-phone-calls.models";
import { SharedService } from "./shared.service";
import { SearchUnscheduledPhoneCalls } from "../models/search-unscheduled-phone-calls.models";
import { CustomerReferralSourceMarketingCosts } from "../models/customer-referral-source-marketing-costs.model";
import { OverallEstimateStatistics } from "../models/overall-estimate-statistics.model";
import { OverallWorkStatistics } from "../models/overall-work-statistics.model";
import { EstimatesByCustomerZipCode } from "../models/estimates-by-customer-zip-code.model";
import { WorkByCustomerZipCode } from "../models/work-by-customer-zip-code.model";
import { EstimatorBreakdowns } from "../models/estimator-breakdowns.model";
import { EstimateToWorkStats } from "../models/estimate-to-work-stats.model";
import { MissingEstimates } from "../models/missing-estimates.model";
import { CrewBreakdowns } from "../models/crew-breakdowns.model";
import { CsrCustomerToWorkStats } from "../models/csr-customer-to-work-stats.model";
import { Statistics } from "../models/statistics.model";
import { AllUserLoginFilter } from "../models/all-user-login-filter.model";

@Injectable({
  providedIn: "root",
})
export class GeneralService {
  public user_id;
  public apibaseUrl = environment.API_URL;

  constructor(
    public _sharedService: SharedService,
    public _customService: CustomHttpService,
    public http: HttpClient
  ) {
    // if(this._sharedService.userObj != undefined){
    //   this.user_id = this._sharedService.userObj.id;
    // }
  }

  // to do list start
  createTask(taskObj: Task) {
    var url = "task/create";
    return this._customService.post(url, taskObj);
  }
  /*
    getTaskTypes() {
      var url = "task/types/get";
      return this._customService.get(url)
    }*/

  getTasks(
    user_id: number,
    companyTodoCurrentPageNo: number,
    personalTodoCurrentPageNo: number
  ) {
    var url =
      "task/get/" +
      user_id +
      "/" +
      companyTodoCurrentPageNo +
      "/" +
      personalTodoCurrentPageNo;
    return this._customService.get(url);
  }
  // task/get
  /*
    deleteCompanyTask(taskId: number) {
      var url = "task/company/delete/" + taskId;
      return this._customService.delete(url);
    }*/

  deleteTodoTask(taskId: number) {
    var url = "task/delete/" + taskId;
    return this._customService.delete(url);
  }

  completeTask(taskObj: Task) {
    var url = "complete/task/" + taskObj.id;
    return this._customService.post(url, taskObj);
  }

  //calls start

  schedulePhoneCall(callObj: PhoneCall) {
    var url = "phone_call/create/" + this._sharedService.userObj.id;
    return this._customService.post(url, callObj);
  }

  scheduleBulkPhoneCall(callObj: PhoneCall) {
    var url = "bulk_calls/create";
    return this._customService.post(url, callObj);
  }

  getPhoneCallSearchFilterMeta(searchPhoneCallsObj: SearchPhoneCalls) {
    var url = "phone_call/search/filter";
    return this._customService.post(url, searchPhoneCallsObj);
  }

  getPhoneCallSearchDropdownData() {
    var url = "phone_call/search/required/data";
    return this._customService.get(url);
  }

  getUserSearchByKeyWords(query: string, type: string, user_id: number) {
    var url = "project/searchbykeyword/" + user_id;
    return this._customService.post(url, { query: query, type: type }, false);
  }

  getCapabilityToken() {
    var url = "phone_call/capability_token";
    return this._customService.get(url);
  }

  dialScheduledCall() {
    var url = "https://mint-frog-9263.twil.io/capability-token";
    return this.http.get(url);
  }

  makeCall(phone_number: string) {
    var url = "phone_call/make";
    return this._customService.post(url, phone_number);
  }

  getPhoneCallsFilterTypes() {
    var url = "phone_calls/filter_types";
    return this._customService.get(url);
  }

  phoneCallsDetail(phoneCallsDetailObj: PhoneCallsDetail) {
    // if(this._sharedService.phoneCallsDetailID > 0){
    var url = "phone_call/complete/" + this._sharedService.userObj.id;
    return this._customService.post(url, phoneCallsDetailObj);
    // }
  }

  getPhoneCallsFilterResults(
    id: number,
    filter_id: number,
    CurrentPageNo: number
  ) {
    var url =
      "phone_calls/filter/" + id + "/" + filter_id + "/" + CurrentPageNo;
    return this._customService.get(url);
  }

  getScheduledPhoneCalls() {
    var url = "scheduled_phone_calls/all";
    return this._customService.get(url);
  }

  getProjectsMetaForUnscheduledCalls() {
    var url = "phone_calls/unscheduled_phone_calls/projects/meta";
    return this._customService.get(url);
  }

  getUnScheduledPhoneCallsCustomers(
    unScheduledPhoneCallsObj: SearchUnscheduledPhoneCalls
  ) {
    var url = "unscheduled_phone_calls_customers/search";
    return this._customService.post(url, unScheduledPhoneCallsObj);
  }

  getUnScheduledPhoneCallsProjects(
    unScheduledPhoneCallsObj: SearchUnscheduledPhoneCalls
  ) {
    var url = "unscheduled_phone_calls_projects/search";
    return this._customService.post(url, unScheduledPhoneCallsObj);
  }

  getProjectsOfCustomers(customer_id: number) {
    var url = "phone_calls/projects/" + customer_id;
    return this._customService.get(url);
  }

  getCompletedPhoneCalls() {
    var url = "phone_call/logs";
    return this._customService.get(url);
  }

  getCustomersProjectsMeta() {
    var url = "customers_projects_meta/all";
    return this._customService.get(url);
  }

  getCustomerEstimatorsMeta() {
    var url = "customers_estimator_meta/all";
    return this._customService.get(url);
  }

  getAllCustomerCalls(id: number) {
    var url = "customer/calls/all/" + id;
    return this._customService.get(url);
  }

  getUserFullNameMeta() {
    var url = "get_user_full_name";
    return this._customService.get(url);
  }

  getMyPhoneCallsMeta(id: number) {
    var url = "calls/my_phone_calls/all/" + id;
    return this._customService.get(url);
  }

  getTodayPhoneCallsMeta(id: number) {
    var url = "calls/today_phone_calls/all/" + id;
    return this._customService.get(url);
  }

  deleteMyPhoneCall(id: number) {
    var url = "calls/my_phone_calls/delete/" + id;
    return this._customService.delete(url);
  }

  deleteTodayPhoneCall(id: number) {
    var url = "calls/today_phone_calls/delete/" + id;
    return this._customService.delete(url);
  }

  deleteScheduledPhoneCall(callId: number) {
    var url = "delete_scheduled_calls/" + callId;
    return this._customService.delete(url);
  }

  deleteMyCompletedPhoneCall(callId: number) {
    var url = "api/PhoneCall/DeleteMyCompletedPhoneCall";
    return this._customService.delete(url, callId);
  }

  // general starts from here (CustomerInteractionComponent)
  addNewNote(customerId: number) {
    var url = "api/Customer/AddNewNote";
    return this._customService.postWithoutHeader(url, customerId);
  }

  viewAllCustomerCalls(customerId: number) {
    var url = "api/Customer/AddNewNote";
    return this._customService.postWithoutHeader(url, customerId);
  }

  // calendars Start

  deleteEvent(eventId: number) {
    var url = "calendars/appointment/delete/" + eventId;
    return this._customService.delete(url, eventId);
  }

  getAppointmentData() {
    var url = "calendars/appointment/data";
    return this._customService.get(url);
  }

  createEvent(calendarObj: Calendars) {
    var url = "calendars/event/create/" + this._sharedService.userObj.id;
    return this._customService.post(url, calendarObj);
  }

  editEvent(calendarsObj: Calendars) {
    var url =
      "calendars/event/edit/" +
      calendarsObj.id +
      "/" +
      this._sharedService.userObj.id;
    return this._customService.post(url, calendarsObj);
  }

  getEvent(id: number) {
    var url = "calendars/event1/data/" + id;
    return this._customService.get(url);
  }

  getdataFromProject(id: number) {
    var url = "calendars/project/data/" + id;
    return this._customService.get(url);
  }

  getEvents(user_id: number) {
    var url = "calendars/event/data/" + user_id;
    return this._customService.get(url);
  }

  // getUserRoles() {
  //   var url = "calendars/user/roles";
  //   return this._customService.get(url);
  // }

  viewAppointmentDetails(id: number) {
    var url = "calendars/event/view/" + id;
    return this._customService.get(url);
  }

  getDataForEstimatorAppointment(id: number) {
    var url = "calendars/event/appointment/event/" + id;
    return this._customService.get(url);
  }

  //user Administration Starts

  createUser(userObj: UserAdministration) {
    var url = "user/create";
    return this._customService.post(url, userObj);
  }

  createUserDetail(userLoginDetailsObj: UserLoginDetails) {
    var url = "userdetail/create";
    return this._customService.post(url, userLoginDetailsObj);
  }

  getUserLoginDetails(id: number) {
    var url = "userdetail/" + id;
    return this._customService.get(url);
  }

  getAllUserLoginDetails(
    all_user_login: AllUserLoginFilter,
    currentPageNo: number
  ) {
    var url = "adminOptions/allUserLogins/get/" + currentPageNo;
    return this._customService.post(url, all_user_login);
  }

  // userdetail/all

  updateIsActiveUser(UserAdministrationObj: UserAdministration, id: number) {
    var url = "users/user/is_active/" + UserAdministrationObj.id;
    return this._customService.post(url, UserAdministrationObj);
  }

  getUsers(
    query: string,
    ActiveCurrentPageNo: number,
    innActiveCurrentPageNo: number
  ) {
    var url = "users/all/" + ActiveCurrentPageNo + "/" + innActiveCurrentPageNo;
    return this._customService.post(url, { query: query });
  }

  getUser(id: number) {
    var url = "user/" + id;
    return this._customService.get(url);
  }

  getUserMeta() {
    var url = "user/meta";
    return this._customService.get(url);
  }

  saveAuthorizeCity(authorizeCityObj: AuthorizeCity) {
    var url = "users/manage_access/authorize_city";
    return this._customService.post(url, authorizeCityObj);
  }

  saveAuthorizeZipCode(authorizeZipCodeObj: AuthorizeZipCode) {
    var url = "users/manage_access/authorize_zip_code";
    return this._customService.post(url, authorizeZipCodeObj);
  }

  getUserAuthorizationMeta(id: number) {
    var url = "users/manage_access/authorization_meta/" + id;
    return this._customService.get(url);
  }

  deleteAuthorizedCity(id: number) {
    var url = "users/manage_access/authorized_city/delete/" + id;
    return this._customService.delete(url);
  }

  deleteAuthorizedZipCode(id: number) {
    var url = "users/manage_access/authorized_zip_code/delete/" + id;
    return this._customService.delete(url);
  }

  deleteProject(id: number) {
    var url = "project/delete/" + id;
    return this._customService.delete(url);
  }

  // createUserManageAccess(userManageAccessObj: UserManageAccess) {
  //   var url = "users/manage_access/create";
  //   return this._customService.post(url, userManageAccessObj);
  // }

  // saveAuthorizeCity

  getUserManageAccessMeta() {
    var url = "users/manage_access/meta";
    return this._customService.get(url);
  }

  updateUser(userObj: UserAdministration) {
    var url = "user/update/" + userObj.id;
    return this._customService.post(url, userObj);
  }

  updateUsers(userObj: UserAdministration) {
    var url = "users/update";
    return this._customService.post(url, userObj);
  }

  deleteUser(userID: number) {
    var url = "user/delete/" + userID;
    return this._customService.delete(url);
  }

  //Password reset email send
  sendPasswordResetLink(data) {
    return this._customService.post("password/email", data);
  }

  //Statistics Module Start

  filterCustomerReferralSourceMarketingCosts(statisticsObj: Statistics) {
    var url = "statistics/filter/customer-referral-source-marketing-costs";
    return this._customService.post(url, statisticsObj);
  }

  filterOverallEstimateStatistics(statisticsObj: Statistics) {
    var url = "statistics/filter/overall-estimate-statistics";
    return this._customService.post(url, statisticsObj);
  }

  filterOverallWorkStatistics(statisticsObj: Statistics) {
    var url = "statistics/filter/overall-work-statistics";
    return this._customService.post(url, statisticsObj);
  }

  filterEstimatesByCustomerZipCode(statisticsObj: Statistics) {
    var url = "statistics/filter/estimates-by-customer-zipcode";
    return this._customService.post(url, statisticsObj);
  }

  filterWorkByCustomerZipCode(statisticsObj: Statistics) {
    var url = "statistics/filter/work-by-customer-zipcode";
    return this._customService.post(url, statisticsObj);
  }

  filterCSRCustomerToWorkStat(statisticsObj: Statistics) {
    var url = "statistics/filter/csr-customer-to-work-stat";
    return this._customService.post(url, statisticsObj);
  }

  filterEstimatorBreakdowns(statisticsObj: Statistics) {
    var url = "statistics/filter/estimator-breakdowns";
    return this._customService.post(url, statisticsObj);
  }

  filterEstimateToWorkStat(statisticsObj: Statistics) {
    var url = "statistics/filter/estimate-to-work-stats";
    return this._customService.post(url, statisticsObj);
  }

  filterMissingEstimates(statisticsObj: Statistics) {
    var url = "statistics/filter/missing-estimates";
    return this._customService.post(url, statisticsObj);
  }

  filterCrewBreakdowns(statisticsObj: Statistics) {
    var url = "statistics/filter/crew-break-downs";
    return this._customService.post(url, statisticsObj);
  }
}

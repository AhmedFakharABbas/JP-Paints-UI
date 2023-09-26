import { Calendar } from "./../models/calendar";
import { ReferralSource } from "./../models/referral-source";
import { User } from "./../models/user.model";
import { PaintBrand } from "./../models/paint-brand";
import { Injectable } from "@angular/core";
import { CustomHttpService } from "./custom-http.service";
import { Project } from "../models/project";
import { ProjectExpense } from "../models/project-expense";
import { Estimate } from "../models/estimate.model";
import { AdminOptions } from "../models/admin-options.model";
import { ProjectDetails } from "../models/project-details.model";
import { SubProjects } from "../models/sub-projects.model";
import { CustomerPayments } from "../models/customer-payments";
import { Vendor } from "../models/vendor";
import { ProjectExpenses } from "../models/project-expenses.model";
import { ExpenseItems } from "../models/expense-items.model";
import { SubProjectItems } from "../models/sub-project-items.model";
import { SearchProject } from "../models/search-project.model";
import { ProjectAttachments } from "../models/ProjectAttachments";
import { OtherDescription } from "../models/other-description.model";
import { InteriorPaints } from "../models/interior-paints.models";
import { InteriorDescription } from "../models/interior-description.model";
import { MarketingComponent } from "../components/admin/marketing/marketing.component";
import { MarketingExpenditures } from "../models/marketing-expenditures.model";
import { UserAdministration } from "../models/user-administration.model";
import { SharedService } from "./shared.service";
import { UserLoginDetails } from "../models/user-login-details.model";
import { AllUserLoginFilter } from "../models/all-user-login-filter.model";

@Injectable({
  providedIn: "root",
})
export class AdminSideService {
  user_id: number;
  constructor(
    public _sharedService: SharedService,
    public _customService: CustomHttpService
  ) {
    // this.user_id = this._sharedService.userObj.id;
  }

  //   projects start

  createProject(projectObj: Project) {
    var url = "project/create/" + this._sharedService.userObj.id;
    return this._customService.post(url, projectObj);
  }

  getProjects() {
    var url = "projects/read";
    return this._customService.get(url);
  }

  getProject(id: number) {
    var url = "project/read/" + id;
    return this._customService.get(url);
  }

  updateProject(projectObj: Project) {
    //
    var url =
      "project/update/" + projectObj.id + "/" + this._sharedService.userObj.id;
    return this._customService.post(url, projectObj);
  }

  deleteProject(id: number) {
    var url = "project/delete/" + id;
    return this._customService.delete(url);
  }

  getProjectMeta() {
    var url = "project/meta/" + this._sharedService.userObj.id;
    return this._customService.get(url);
  }
  getCustomerProjectMeta(customer_id) {
    var url =
      "project/meta/" + customer_id + "/" + this._sharedService.userObj.id;
    return this._customService.get(url);
  }

  addSubProjects(SubProjectsObj: SubProjects) {
    var url = "project/savesubproject/" + this._sharedService.userObj.id;
    return this._customService.post(url, SubProjectsObj);
  }

  updateSubProject(SubProjectsObj: SubProjects) {
    //
    var url =
      "project/sub_project/update/" +
      SubProjectsObj.id +
      "/" +
      this._sharedService.userObj.id;
    return this._customService.post(url, SubProjectsObj);
  }

  getSubProjectsMeta(id: number) {
    var url = "project/sub_project/read/" + id;
    return this._customService.get(url);
  }

  saveSubProjectAssignments(SubProjectItemsArray: Array<SubProjectItems>) {
    var url = "project/sub_project/items/create";
    return this._customService.post(url, {
      SubProjectItemsArray: SubProjectItemsArray,
    });
  }

  deleteSubProject(id: number) {
    var url = "project/delete/subproject/" + id;
    return this._customService.delete(url);
  }

  getProjectSearchFilterMeta(
    projectSearchObj: SearchProject,
    user_id: number,
    CurrentPageNo: number
  ) {
    var url = "project/search/filter/" + user_id + "/" + CurrentPageNo;
    return this._customService.post(url, projectSearchObj);
  }

  AddCustomerPayment(customerPaymentsObj: CustomerPayments) {
    var url = "project/savepayment/" + this._sharedService.userObj.id;
    return this._customService.post(url, customerPaymentsObj);
  }

  getCustomerPayments(id: number) {
    var url = "customer_payments/read/" + id;
    return this._customService.get(url);
  }

  getCustomerPayment(id: number) {
    var url = "customer_payment/read/" + id;
    return this._customService.get(url);
  }

  updateCustomerPayment(customerPaymentObj: CustomerPayments) {
    var url =
      "customer_payment/update/" +
      customerPaymentObj.id +
      "/" +
      this._sharedService.userObj.id;
    return this._customService.post(url, customerPaymentObj);
  }

  // getExpenseMeta(id: number) {
  //   var url = "project/expense/meta/" + id;
  //   return this._customService.get(url);
  // }

  createExpense(projectExpensesObj: ProjectExpenses) {
    var url = "project/saveexpense/" + this._sharedService.userObj.id;
    return this._customService.post(url, projectExpensesObj);
  }

  createExpenseItem(projectExpenseItemsObj: ExpenseItems) {
    var url = "project/save/expenseitems";
    return this._customService.post(url, projectExpenseItemsObj);
  }

  updateExpenseItem(projectExpenseItemsObj: ExpenseItems) {
    var url = "project/update1/expenseitems/" + projectExpenseItemsObj.id;
    return this._customService.post(url, projectExpenseItemsObj);
  }

  deleteExpenseItems(id: number) {
    var url = "project/delete/expenseitems/" + id;
    return this._customService.delete(url);
  }

  getExpenseItemsPaintOrderMeta(id: number) {
    var url = "project/expenseitems/meta/" + id;
    return this._customService.get(url);
  }

  // admin-options

  getProjectExpensesMeta(id: number) {
    var url = "project/expenses/read/" + id;
    return this._customService.get(url);
  }

  getProjectExpense(id: number) {
    var url = "project/expense/read/" + id;
    return this._customService.get(url);
  }

  updateProjectExpense(ProjectExpenseObj: ProjectExpenses) {
    var url =
      "project/expense/update/" +
      ProjectExpenseObj.id +
      "/" +
      this._sharedService.userObj.id;
    return this._customService.post(url, ProjectExpenseObj);
  }

  // Marketing Expenditures start

  createMarketingExpenditure(marketingExpendituresObj: MarketingExpenditures) {
    var url = "adminOptions/marketingExpenditure/create";
    return this._customService.post(url, marketingExpendituresObj);
  }

  getAllReferralSources() {
    var url = "adminOptions/marketingExpenditure/referralSource/get";
    return this._customService.get(url);
  }

  getAllMarketingExpenditures() {
    var url = "adminOptions/marketingExpenditure/get";
    return this._customService.get(url);
  }

  getMarketingExpenditure(id: number) {
    var url = "adminOptions/marketingExpenditure/get/" + id;
    return this._customService.get(url);
  }

  deleteMarketingExpenditure(id: number) {
    var url = "adminOptions/marketingExpenditure/delete/" + id;
    return this._customService.delete(url);
  }

  // Marketing Expenditures end

  createEstimate(projectDetailsObj: ProjectDetails) {
    var url = "project/saveestimate/" + this._sharedService.userObj.id;
    return this._customService.post(url, projectDetailsObj);
  }

  getEstimate(id: number) {
    var url = "project/estimate/read/" + id;
    return this._customService.get(url);
  }

  getPDFData(id: number) {
    var url = "project/pdf/" + id;
    return this._customService.get(url);
  }

  createSubProjectItem(id: number) {
    var url = "project/sub_project/read/" + id;
    return this._customService.get(url);
  }

  getSubProjectItem(id: number) {
    var url = "project/sub_project/get/" + id;
    return this._customService.get(url);
  }

  getWorkOrder(id: number) {
    var url = "project/workorder/read/" + id;
    return this._customService.get(url);
  }

  getEstimates() {
    var url = "project/estimates/read";
    return this._customService.get(url);
  }

  updateEstimate(projectDetailsObj: ProjectDetails) {
    var url =
      "project/estimate/update/" +
      projectDetailsObj.id +
      "/" +
      this._sharedService.userObj.id;
    return this._customService.post(url, projectDetailsObj);
  }
  //   projects end

  //vendors start
  createVendor(vendorObj: Vendor) {
    var url = "vendors/create";
    return this._customService.post(url, vendorObj);
  }

  updateVendor(VendorObj: Vendor) {
    var url = "vendors/update/" + VendorObj.id;
    return this._customService.post(url, VendorObj);
  }

  getRequiredData() {
    var url = "vendors/data";
    return this._customService.get(url);
  }

  getVendors() {
    var url = "vendors/all";
    return this._customService.get(url);
  }

  getVendor(id: number) {
    var url = "vendors/read/" + id;
    return this._customService.get(url);
  }

  deleteVendor(id: number) {
    var url = "vendors/delete/" + id;
    return this._customService.delete(url);
  }

  uploadAttachments(files: Array<ProjectAttachments>, id: number) {
    const url = "project/files";
    return this._customService.post(url, { files: files, id: id });
  }
  deleteAttachment(id: number, encrypted_name: string) {
    var url = "project/files/delete";
    return this._customService.post(url, {
      id: id,
      encrypted_name: encrypted_name,
    });
  }

  getSingleProject(id: number) {
    var url = "project/single/read/" + id;
    return this._customService.get(url);
  }

  // paint brand start
  addPaintBrand(paintBrand: PaintBrand) {
    var url = "paintBrand/create";
    return this._customService.post(url, paintBrand);
  }

  updatePaintBrand(paintBrand: PaintBrand) {
    var url = "paintBrand/update/" + paintBrand.id;
    return this._customService.post(url, paintBrand);
  }

  getPaintBrands() {
    var url = "paintBrand/all";
    return this._customService.get(url);
  }

  getPaintBrand(id: number) {
    var url = "paintBrand/read/" + id;
    return this._customService.get(url);
  }

  deletePaintBrand(id: number) {
    var url = "paintBrand/delete/" + id;
    return this._customService.delete(url);
  }

  // paint brand end

  //  user comission work

  getAllUsers() {
    var url = "commission/user/all";
    return this._customService.get(url);
  }

  updateUserCommission(user: User) {
    var url = "commission/update/" + user.id;
    return this._customService.post(url, user);
  }

  getcommissionUsers() {
    var url = "commission/all";
    return this._customService.get(url);
  }

  // user comission end

  filterAllUserLogins(all_user_login: AllUserLoginFilter) {
    var url = "all-user-login/filter";
    return this._customService.post(url, all_user_login);
  }

  // Referral source start
  addReferralSource(referralSourceObj: ReferralSource) {
    var url = "referralSource/create";
    return this._customService.post(url, referralSourceObj);
  }

  updateReferralSource(referralSource: ReferralSource) {
    var url = "referralSource/update/" + referralSource.id;
    return this._customService.post(url, referralSource);
  }

  getReferralSources() {
    var url = "referralSource/all";
    return this._customService.get(url);
  }

  getReferralSource(id: number) {
    var url = "referralSource/read/" + id;
    return this._customService.get(url);
  }

  deleteReferralSource(id: number) {
    var url = "referralSource/delete/" + id;
    return this._customService.delete(url);
  }

  // Referral source end

  // calendar work start

  deletecalendar(id: number) {
    var url = "adminOptions/manageCalendars/delete/" + id;
    return this._customService.delete(url);
  }

  deletecurrentuser(id: number) {
    var url = "adminOptions/manageCalendars/currentUser/delete/" + id;
    return this._customService.delete(url);
  }

  getCalendarUsers(id: number, user_id: number) {
    var url = "adminOptions/manageCalendars/users/get/" + id + "/" + user_id;
    return this._customService.get(url);
  }

  getSelectedCalendarUsers(id: number, user_id?: number) {
    var url = "calendars/selected/users/" + id + "/" + user_id;
    return this._customService.get(url);
  }

  getProjectsOfCustomers(customer_id: number) {
    var url = "calendars/appointments/customer/projects/" + customer_id;
    return this._customService.get(url);
  }

  getMonthlyEvents(start_date: string, view, user_id) {
    var url =
      "calendars/appointments/paginate/" +
      start_date +
      "/" +
      view +
      "/" +
      user_id;
    return this._customService.get(url, start_date);
  }

  getCalendarNames() {
    var url = "adminOptions/manageCalendars/get";
    return this._customService.get(url);
  }

  addCalendar(calendar: Calendar) {
    var url = "adminOptions/manageCalendars/create";
    return this._customService.post(url, calendar);
  }

  getUsers() {
    var url = "commission/user/all";
    return this._customService.get(url);
  }

  getCalendarMeta(id: number) {
    var url = "adminOptions/manageCalendars/meta/" + id;
    return this._customService.get(url);
  }

  updateCalendar(calendar: Calendar) {
    var url = "adminOptions/manageCalendars/update/" + calendar.id;
    return this._customService.post(url, calendar);
  }

  addDescription(description: OtherDescription) {
    var url = "project/estimate/adddesciption";
    return this._customService.post(url, description);
  }
  updateDescription(description: OtherDescription) {
    var url = "project/estimate/updatedesciption";
    return this._customService.post(url, description);
  }
  deleteDescription(id: number) {
    var url = "project/estimate/deletedesciption/" + id;
    return this._customService.delete(url);
  }
  addInteriorPaint(interiorPaint: InteriorPaints) {
    var url = "project/estimate/addinteriorpaint";
    return this._customService.post(url, interiorPaint);
  }
  updateInteriorPaint(interiorPaint: InteriorPaints) {
    var url = "project/estimate/updateinteriorpaint";
    return this._customService.post(url, interiorPaint);
  }
  deleteInteriorPaint(id: number) {
    var url = "project/estimate/deleteinteriorpaint/" + id;
    return this._customService.delete(url);
  }
  addInteriorDescription(interiorDescription: InteriorDescription) {
    var url = "project/estimate/addinteriordescription";
    return this._customService.post(url, interiorDescription);
  }
  updateInteriorDescription(interiorDescription: InteriorDescription) {
    var url = "project/estimate/updateinteriordescription";
    return this._customService.post(url, interiorDescription);
  }
  deleteInteriorDescription(id: number) {
    var url = "project/estimate/deleteinteriordescription/" + id;
    return this._customService.delete(url);
  }

  getProjectSearchByKeyWords(query: string, type: string, user_id: number) {
    var url = "project/searchbykeyword/" + user_id;
    return this._customService.post(url, { query: query, type: type }, false);
  }
}

import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CustomerPayments } from "src/app/models/customer-payments";
import { Project } from "src/app/models/project";
import { GeneralService } from "src/app/services/general.service";
import { SharedService } from "src/app/services/shared.service";
import { CustomerService } from "src/app/services/customer.service";
import { AdminSideService } from "src/app/services/admin-side.service";
import { ProjectExpense } from "src/app/models/project-expense";
import { Estimate } from "src/app/models/estimate.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectDetails } from "src/app/models/project-details.model";
import { SubProjects } from "src/app/models/sub-projects.model";
import { DynamicProjectDetails } from "src/app/models/dynamic-project-details";
import { OtherDescription } from "src/app/models/other-description.model";
import { InteriorDescription } from "src/app/models/interior-description.model";
import { InteriorPaints } from "src/app/models/interior-paints.models";
import { ProjectExpenses } from "src/app/models/project-expenses.model";
import { ExpenseItems } from "src/app/models/expense-items.model";
import { SubProjectItems } from "src/app/models/sub-project-items.model";
import { User } from "src/app/models/user.model";
import { Vendor } from "src/app/models/vendor";
import * as $ from "jquery";
import { element } from "protractor";
import { isThisSecond } from "date-fns";
import { FormControl, NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { trigger } from "@angular/animations";
@Component({
  selector: "app-view-projects",
  templateUrl: "./view-projects.component.html",
  styleUrls: ["./view-projects.component.css"],
})
export class ViewProjectsComponent implements OnInit {
  collected_by_id: number = undefined;
  customerPaymentID: number = 0;
  navigateToExpensesTab: boolean = false;
  users: Array<User>;
  vendors: Array<Vendor>;
  placeHolder: string;
  pay_to_id: number;
  other_description_obj: OtherDescription;
  isShowExpenseItems: Boolean = false;
  showMainContent: Boolean = true;
  showPaymentMainContent: boolean = true;
  showSubProjectsMainContent: boolean = true;
  isSubProjectEdit: boolean = false;
  isShowPaymentDetails: Boolean = false;
  deleteCount: any;
  project_detail_id: number;
  projectDetails;
  projectDetailsID: number;
  estimateObj: Estimate;
  projectDetailsObj: ProjectDetails;
  otherDescriptionObj: OtherDescription;
  interiorPaintsObj: InteriorPaints;
  interiorDescriptionObj: InteriorDescription;
  customerPaymentsObj: CustomerPayments;
  projectExpensesObj: ProjectExpenses;
  customer_id: number;
  projectID: number;
  projectExpenceObj: ProjectExpense;
  projectExpenseItemsObj: ExpenseItems;
  project_id: number;
  projectObj: Project;
  activeModelRef: NgbModalRef;
  subProjectsObj: SubProjects;
  subProjectItemsObj: SubProjectItems;
  subProjectsArray: Array<Object>;
  assignment: Array<string>;
  decks_finishes: Array<string>;
  decks_paints: Array<string>;
  expense_status: Array<string>;
  expense_types: Array<any>;
  finishing: Array<string>;
  pay_To: Array<any>;
  crew: any;
  pexpenseID: number;
  payment_methods: Array<string>;
  discount_Types: Array<string>;
  project: Array<string>;
  shutter_types: Array<string>;
  siding_types: Array<string>;
  trim_types: Array<string>;
  amount_collected_by: Array<string>;
  ordered_By: Array<string>;
  sub_project_status: Array<any>;
  rowCount: Array<any>;
  arrayContainer: any;
  index: number;
  subTotal: number;
  clickCounter: number = 0;
  paintAreaClickCounter: number = 0;
  notesAreaClickCounter: number = 0;
  expenseItemsAreaClickCounter: number = 0;
  customerPaymentsArray: Array<CustomerPayments>;
  estimateDetails: any;
  projectExpensesArray: Array<ProjectExpenses>;
  selectedPaymentToShow: CustomerPayments;
  sub_projects_details: Array<SubProjects>;
  amountAfterDiscount: number;
  projectDetailID: number;
  dynamicProjectsArray: Array<OtherDescription>;
  dynamicPaintAreaArray: Array<InteriorPaints>;
  dynamicNotesAreaArray: Array<InteriorDescription>;
  activeTab = "nav-expenses";
  sub_projects_items_array: Array<SubProjectItems>;
  sub_project_item: SubProjectItems;
  sub_project_items: Array<SubProjectItems>;
  project_infromation: any;
  dynamicProjectDetailsObj: DynamicProjectDetails;

  //payment Collecte By search
  paymentCollectedBySearch = new FormControl();
  usersToCollectPayment: Observable<any[]>;
  //userSearch search
  userSearch = new FormControl();
  userSearchResults: Observable<any[]>;
  //orderedBy search
  orderedBySearch = new FormControl();
  orderedBySearchResults: Observable<any[]>;
  paymentCollectorType: string;

  constructor(
    private _adminService: AdminSideService,
    private router: Router,
    private route: ActivatedRoute,
    private _modelService: NgbModal,
    private _adminsideService: AdminSideService,
    private _generalService: GeneralService,
    public _sharedService: SharedService,
    private _customerService: CustomerService
  ) {}

  ShowHideButton() {
    this.showMainContent = this.showMainContent ? false : true;
  }

  ShowHideButtonForPayments() {
    this.showPaymentMainContent = this.showPaymentMainContent ? false : true;
  }

  ShowHideButtonForSubProjects() {
    this.showSubProjectsMainContent = this.showSubProjectsMainContent
      ? false
      : true;
  }

  ngOnInit() {
    this.users = new Array<User>();
    this.vendors = new Array<Vendor>();
    this.dynamicProjectDetailsObj = new DynamicProjectDetails();
    this.projectObj = new Project();
    this.otherDescriptionObj = new OtherDescription();
    this.interiorDescriptionObj = new InteriorDescription();
    this.interiorPaintsObj = new InteriorPaints();
    // this.customerPaymentsDetailObj = new CustomerPayments();
    // this.projectDetails = new Customer();
    // this.projectDetails = new Project();

    this.sub_project_item = new SubProjectItems();
    this.sub_project_items = new Array<SubProjectItems>();

    this.projectDetails = new ProjectDetails();
    this.customerPaymentsObj = new CustomerPayments();
    this.projectExpensesObj = new ProjectExpenses();
    this.projectExpenceObj = new ProjectExpense();
    this.projectExpenseItemsObj = new ExpenseItems();
    this.subProjectsObj = new SubProjects();
    this.subProjectItemsObj = new SubProjectItems();
    this.estimateObj = new Estimate();
    this.projectDetailsObj = new ProjectDetails();
    this.otherDescriptionObj = new OtherDescription();

    this.projectDetailsObj.dynamicProjectsArray = new Array<OtherDescription>();
    this.projectDetailsObj.dynamicPaintAreaArray = new Array<InteriorPaints>();
    this.projectDetailsObj.dynamicNotesAreaArray =
      new Array<InteriorDescription>();
    this.projectExpensesObj.expenseItemsArray = new Array<ExpenseItems>();

    this.customerPaymentsArray = new Array<CustomerPayments>();
    this.projectExpensesArray = new Array<ProjectExpenses>();

    this.sub_projects_items_array = new Array<SubProjectItems>();

    this.route.params.subscribe((params) => {
      this.projectID = +params["id"]; // (+) converts string 'id' to a number
      if (
        this.projectID != undefined &&
        this.projectID != 0 &&
        !isNaN(this.projectID)
      ) {
        this.onGetProject(this.projectID);
        this.onGetCustomerPayments(this.projectID);
        this.onGetAllProjectExpenses(this.projectID);
        this.onGetSubProjectsMeta(this.projectID);
        // this.onGetEstimate(this.projectID);
      } else {
        this.projectID = 0;
      }
    });

    this.addPaintAreaFieldValue();

    // this.route.fragment.subscribe((fragment) => {
    //   console.log(fragment)
    // });

    this.pexpenseID =
      this.route.snapshot.queryParams["queryParam"] != undefined
        ? parseInt(this.route.snapshot.queryParams["queryParam"])
        : undefined;
    if (this.pexpenseID != undefined) {
      this.onGetAllProjectExpense(this.pexpenseID);

      this.showMainContent = false;
    }
    //get the customers
    this.paymentCollectedBySearch.valueChanges.subscribe((value) => {
      if (value != undefined) {
        if (value.length == 0) {
          this.customerPaymentsObj.payment_collected_by = undefined;
        }
        if (value.length >= 2) {
          this._adminService
            .getProjectSearchByKeyWords(
              value,
              "users",
              this._sharedService.userObj.id
            )
            .subscribe((response: any) => {
              this.usersToCollectPayment = response.search_result;
            });
        } else {
          return null;
        }
      }
    });
    //get the user/ for exepenseses
    this.userSearch.valueChanges.subscribe((value) => {
      if (value != undefined) {
        if (value.length == 0) {
          this.projectExpensesObj.collected_by = undefined;
        }
        if (value.length >= 2) {
          console.log(this.projectExpensesObj.pay_to);
          let type = this._adminService
            .getProjectSearchByKeyWords(
              value,
              this.projectExpensesObj.pay_to == 4
                ? "crew"
                : this.projectExpensesObj.pay_to == 6
                ? "estimator"
                : "vendor",
              this._sharedService.userObj.id
            )
            .subscribe((response: any) => {
              this.userSearchResults = response.search_result;
            });
        } else {
          return null;
        }
      }
      // if (value != undefined) {
      //   if (value.length == 0) {
      //     this.projectExpensesObj.ordered_by = undefined;
      //   }
      //   if (value.length >= 2) {
      //     this._adminService
      //       .getProjectSearchByKeyWords(
      //         value,
      //         "users",
      //         this._sharedService.userObj.id
      //       )
      //       .subscribe((response: any) => {
      //         this.orderedBySearchResults = response.search_result;
      //       });
      //   } else {
      //     return null;
      //   }
      // }
    });
    //order by for expenses
    this.orderedBySearch.valueChanges.subscribe((value) => {
      if (value != undefined) {
        if (value.length == 0) {
          this.projectExpenceObj.orderedBy = undefined;
        }
        if (value.length >= 2) {
          this._adminService
            .getProjectSearchByKeyWords(
              value,
              "users",
              this._sharedService.userObj.id
            )
            .subscribe((response: any) => {
              this.orderedBySearchResults = response.search_result;
            });
        } else {
          return null;
        }
      }
    });
  }

  onGetProject(id: number) {
    this._adminService.getProject(id).subscribe(
      (res: any) => {
        this.project_detail_id = res.project_detail_id;
        this.projectDetails = res.project[0];
        let final_price = +this.projectDetails.final_price;
        this.projectDetails.final_price = final_price.toFixed(2);

        console.log(this.projectDetails.final_price);
        if (this.projectDetails != undefined) {
          this.projectDetailsObj.discount_type =
            this.projectDetails.attachments = res.project_attachments;
        }
        this.assignment = res.assignment;
        this.decks_finishes = res.decks_finish;
        this.decks_paints = res.decks_paint;
        this.discount_Types = res.discount_type;
        this.expense_status = res.expense_statuses;
        this.expense_types = res.expense_types;
        this.finishing = res.finish;
        this.pay_To = res.pay_to;
        this.amount_collected_by = res.payment_collected_by;
        // this.ordered_By = res.payment_collected_by;
        this.payment_methods = res.payment_methods;
        // this.crew = res.crew;
        this.project = res.project;
        this.shutter_types = res.shutter_type;
        this.siding_types = res.siding_types;
        this.sub_project_status = res.sub_project_statuses;
        this.trim_types = res.trim_type;
      },
      (err) => {
        this._sharedService.error(err.error);
      }
    );
  }

  onAddCustomerPayment(form: NgForm) {
    if (this.customerPaymentsObj.payment_collected_by != undefined) {
      this.customerPaymentsObj.project_id = this.projectID;
      this._adminService.AddCustomerPayment(this.customerPaymentsObj).subscribe(
        (res: any) => {
          debugger;
          this.showPaymentMainContent = true;
          this.customerPaymentsObj.id = res.customer_payment_id;
          // var index = this.customerPaymentsArray.findIndex(item => item.id == this.customerPaymentID);

          if (
            this.customerPaymentsObj.id != undefined &&
            this.customerPaymentsObj.id == res.customer_payment_id
          ) {
            this.customerPaymentsObj.payment_method = res.payment_method;
            this.customerPaymentsObj.payment_collected_by =
              res.payment_collected_by;
          }

          this.customerPaymentsArray.push(this.customerPaymentsObj);
          console.log(this.customerPaymentsObj);

          this._sharedService.success(res.success);
          // this.resetForm(form);
        },
        (error) => {
          this._sharedService.error(error.error);
        }
      );
    }
  }

  onGetCustomerPayments(id: number) {
    this._adminService.getCustomerPayments(id).subscribe(
      (res: any) => {
        this.customerPaymentsArray = res.customer_payments;

        // this.projectDetailsObj = res.estimatedetails[0];
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  onGetCustomerPaymentObj(customerPayment: any) {
    debugger;
    this.customerPaymentsObj = customerPayment;
  }
  naviagteToAddPayament() {
    this.showPaymentMainContent = false;
    this.customerPaymentsObj = new CustomerPayments();
  }

  onGetCustomerPayment(id: number) {
    //
    this._adminService.getCustomerPayment(id).subscribe(
      (res: any) => {
        this.customerPaymentsObj = res.customer_payment;
        // this.projectDetailsObj = res.estimatedetails[0];
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  onEditCustomerPayment() {
    if (this.customerPaymentsObj.payment_collected_by != undefined) {
      this.customerPaymentsObj.project_id = this.projectID;

      this._adminService
        .updateCustomerPayment(this.customerPaymentsObj)
        .subscribe(
          (res: any) => {
            this.showPaymentMainContent = true;
            if (this.showPaymentMainContent == true) {
              this.onGetCustomerPayments(this.projectID);
            }
            this._sharedService.success(res.success);
          },
          (error) => {
            this._sharedService.error(error.message);
          }
        );
    }
  }

  public onChange(event): void {
    this.userSearchResults = undefined;
    this.pay_to_id = event.value;

    if (this.pay_to_id == 4) {
      this.placeHolder = "Crew Leader";
      this.paymentCollectorType = "crew";
    }
    if (this.pay_to_id == 6) {
      this.placeHolder = "Estimator";
      this.paymentCollectorType = "crew";
    }
    if (this.pay_to_id == 90) {
      this.placeHolder = "Vendor";
      this.paymentCollectorType = "vendor";
    }

    // this._adminService.getExpenseMeta(this.pay_to_id).subscribe(
    //   (res: any) => {
    //     // this.pay_To = res.expense_meta;

    //     if (this.pay_to_id == 4 || this.pay_to_id == 6) {
    //       this.users = res.user_meta;

    //       if (this.pay_to_id == 4) {
    //         this.placeHolder = "Crew Leader";

    //       }
    //       if (this.pay_to_id == 6) {
    //         this.placeHolder = "Estimator";
    //       }
    //     }
    //     if (this.pay_to_id == 90) {
    //       this.users = res.vendor_meta;
    //       if (this.pay_to_id == 90) {
    //         this.placeHolder = "Vendor";
    //       }
    //     }
    //   },
    //   (error) => {
    //     this._sharedService.error(error);
    //   }
    // );
  }

  onCreateExpense(form: NgForm) {
    if (this.projectExpensesObj.ordered_by != undefined) {
      this.projectExpensesObj.project_id = this.projectID;
      this._adminsideService.createExpense(this.projectExpensesObj).subscribe(
        (res: any) => {
          this.onGetAllProjectExpenses(this.projectID);
          this.showMainContent = true;
          this.resetForm(form);
          this._sharedService.success(res.success);

          // this.ngOnInit();
        },
        (error) => {
          this._sharedService.error(error.error);
        }
      );
    }
  }

  openSubProjectModel(projectId: number) {
    this.subProjectsArray = new Array<SubProjects>();
    for (let i = 0; i < this._sharedService.countToShowProjects; i++) {
      this.subProjectsObj = new SubProjects();
      this.subProjectsObj.project_id = projectId;
      this.subProjectsArray.push(this.subProjectsObj);
    }
  }

  onAddSubProjects(subProject, idx) {
    this.index = idx;

    if (
      this.projectDetails.work_start_date != undefined &&
      this.projectDetails.work_start_date != null &&
      this.projectDetails.work_start_date != ""
    ) {
      this.subProjectsObj.work_start_date = this.projectDetails.work_start_date;
    }

    if (
      this.projectDetails.work_end_date != undefined &&
      this.projectDetails.work_end_date != null &&
      this.projectDetails.work_end_date != ""
    ) {
      this.subProjectsObj.work_end_date = this.projectDetails.work_end_date;
    }

    this._adminService.addSubProjects(subProject).subscribe(
      (res: any) => {
        // subProject.id = res.sub_project.id;
        // subProject.created_at = res.sub_project.created_at;
        // subProject.crew_name = this.crew.find(item => item.id == subProject.crew_id).name;
        // subProject.sub_project_status = this.sub_project_status.find(item => item.ObjectTypeID == subProject.status).ObjectName;
        // this.sub_projects_details.push(subProject)
        this.onGetSubProjectsMeta(this.projectID);
        this.projectDetailID = res.project_details_id;
        if (this._sharedService.countToShowProjects > 0) {
          this._sharedService.countToShowProjects =
            this._sharedService.countToShowProjects - 1;
        }
        this.subProjectsArray.splice(this.index, 1);
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.err);
      }
    );
  }

  onGetSubProjectsMeta(id: number) {
    this._adminService.getSubProjectsMeta(id).subscribe(
      (res: any) => {
        //

        this.sub_projects_details = res.sub_projects;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetSubProject(subprojectsdetail: any) {
    this.isSubProjectEdit = true;
    this.subProjectsArray = new Array<SubProjects>();
    this.subProjectsArray.push(subprojectsdetail);
  }

  onSaveSubProjectAssignments() {
    // this.sub_projects_details.forEach(element => {
    //   let idx = +this.subProjectItemsObj.sub_project_id;
    //   if (idx == element.id) {
    //     this.subProjectItemsObj.sub_project_id = idx;
    //   }
    // })
    this._adminService
      .saveSubProjectAssignments(this.sub_projects_items_array)
      .subscribe(
        (res: any) => {
          this.sub_projects_items_array = res.sub_projects_items_array;

          this._sharedService.success(res.success);
          //  this.subProjectsArray = res.sub_projects;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  onUpdateSubProject(subProject, idx) {
    this.index = idx;
    this._adminService.updateSubProject(subProject).subscribe((res: any) => {
      this.arrayContainer = this.subProjectsArray.splice(this.index, 1);
      this.showSubProjectsMainContent = true;
      this.isSubProjectEdit = false;
      this.onGetSubProjectsMeta(this.projectID);
      this._sharedService.success(res.success);
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onDeleteSubProject(id: number, idx) {
    this.index = idx;
    this._adminService.deleteSubProject(id).subscribe((res: any) => {
      this.deleteCount = this.sub_projects_details.splice(this.index, 1);
      this.deleteCount.pop();
      this._sharedService.success(res.success);
      // this.ngOnInit();
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onUpdateExpenseItems(expenseItem, idx) {
    this.index = idx;

    this.projectExpenseItemsObj.expense_id = this.projectExpensesObj.id;
    this._adminsideService.updateExpenseItem(expenseItem).subscribe(
      (res: any) => {
        var index = this.projectExpensesArray.findIndex(
          (item) => item.id == this.projectExpensesObj.id
        );
        this.projectExpensesArray[index].amount = res.amount;

        this._sharedService.success("Expense item updated successfully");
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  onCreateExpenseItems() {
    this.projectExpenseItemsObj.expense_id = this.projectExpensesObj.id;
    this._adminService.createExpenseItem(this.projectExpenseItemsObj).subscribe(
      (res: any) => {
        this.projectExpenseItemsObj.id = res.id;
        this.projectExpensesObj.expenseItemsArray.push(
          this.projectExpenseItemsObj
        );
        this.projectExpenseItemsObj = new ExpenseItems();
        var index = this.projectExpensesArray.findIndex(
          (item) => item.id == this.projectExpensesObj.id
        );
        this.projectExpensesArray[index].amount = res.amount;
        this._sharedService.success("Expense item saved successfully");
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  onDeleteExpenseItems(id: number, idx) {
    this._adminService.deleteExpenseItems(id).subscribe((res: any) => {
      this.rowCount = this.projectExpensesObj.expenseItemsArray.splice(idx, 1);
      this.rowCount.pop();
      this._sharedService.success(res.success);
      // this.ngOnInit();
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onGetAllProjectExpenses(id: number) {
    this._adminService.getProjectExpensesMeta(id).subscribe(
      (res: any) => {
        this.projectExpensesArray = res.project_expenses;
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  onGetAllProjectExpense(id: number) {
    this.projectExpenseItemsObj.expense_id = this.projectExpensesObj.id;
    this._adminService.getProjectExpense(id).subscribe(
      (res: any) => {
        debugger;
        console.log(res.expense);
        this.projectExpensesObj = res.expense;
        console.log(this.projectExpensesObj);

        this.vendors = res.vendors;
        this.users = res.users;
        this.collected_by_id = this.projectExpensesObj.collected_by;
        this.projectExpensesObj.expenseItemsArray = res.expense_items;
        console.log(this.projectExpensesObj.expenseItemsArray);
        if (this.projectExpensesObj.expenseItemsArray.length > 0) {
          for (
            let i = 1;
            i < this.projectExpensesObj.expenseItemsArray.length;
            i++
          ) {
            this.expenseItemsAreaClickCounter =
              this.expenseItemsAreaClickCounter + 1;
          }
        }

        // if (this.projectExpensesObj.expenseItemsArray == null || this.projectExpensesObj.expenseItemsArray == undefined || this.projectExpensesObj.expenseItemsArray.length == 0) {
        //   this.projectExpenseItemsObj = new ExpenseItems();
        //   this.projectExpensesObj.expenseItemsArray.push(this.projectExpenseItemsObj);
        //   this.expenseItemsAreaClickCounter = this.expenseItemsAreaClickCounter + 1;
        // }
        // this.projectDetailsObj = res.estimatedetails[0];
        console.log(this.projectExpenceObj);
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  onEditProjectExpense() {
    // this.customerPaymentsObj.project_id = this.projectID;
    if (this.projectExpensesObj.ordered_by != undefined) {
      this.projectExpenseItemsObj.expense_id = this.projectExpensesObj.id;
      this.projectExpensesObj.project_id = this.projectID;
      console.log(this.projectExpensesObj);
      this._adminService
        .updateProjectExpense(this.projectExpensesObj)
        .subscribe(
          (res: any) => {
            this.onGetAllProjectExpenses(this.projectID);
            this.showMainContent = true;

            this._sharedService.success(res.success);
          },
          (error) => {
            this._sharedService.error(error.message);
          }
        );
    }
  }

  onCreateEstimate() {
    this.projectDetailsObj.project_id = this.projectID;
    this._adminsideService.createEstimate(this.projectDetailsObj).subscribe(
      (res: any) => {
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onSubmit() {
    if (this.projectDetailsObj.id != undefined) {
      this.onEditEstimate();
    } else if (this.projectDetailsObj.id == undefined) {
      this.onCreateEstimate();
    }
  }

  onGetEstimate(id: number) {
    this._adminsideService.getEstimate(id).subscribe(
      (res: any) => {
        console.log(res.estimate);
        // console.log(res.estimate.estimate_subtotal);
        // this.projectDetailsObj.exterior_net_amount = 4353454;
        this.project_infromation = res.project_information;
        this.projectDetailsObj = res.estimate;

        this.projectDetailsObj.dynamicProjectsArray = res.other_descriptions;
        this.projectDetailsObj.dynamicPaintAreaArray = res.interiorpaints;
        this.projectDetailsObj.dynamicNotesAreaArray = res.interior_description;

        this.projectDetailsObj.discount_type =
          this.projectDetailsObj.discount_type != undefined
            ? this.projectDetailsObj.discount_type
            : 65;
        this.projectDetailsObj.estimate_discount_value =
          this.projectDetailsObj.estimate_discount_value != undefined
            ? this.projectDetailsObj.estimate_discount_value
            : 0;
        this.projectDetailsObj.is_paint_material_included =
          this.projectDetailsObj.is_paint_material_included != undefined
            ? this.projectDetailsObj.is_paint_material_included
            : true;
        this.projectDetailsObj.discount_payment_method =
          this.projectDetailsObj.discount_payment_method != undefined
            ? this.projectDetailsObj.discount_payment_method
            : 1;

        this.projectDetailsObj.interior_discount_type =
          this.projectDetailsObj.interior_discount_type != undefined
            ? this.projectDetailsObj.interior_discount_type
            : 65;
        this.projectDetailsObj.interior_discount_value =
          this.projectDetailsObj.interior_discount_value != undefined
            ? this.projectDetailsObj.interior_discount_value
            : 0;
        this.projectDetailsObj.interior_payment_method =
          this.projectDetailsObj.interior_payment_method != undefined
            ? this.projectDetailsObj.interior_payment_method
            : 1;
        this.projectDetailsObj.is_interior_paint_material_included =
          this.projectDetailsObj.is_interior_paint_material_included !=
          undefined
            ? this.projectDetailsObj.is_interior_paint_material_included
            : true;

        this.projectDetailsObj.exterior_discount_type =
          this.projectDetailsObj.exterior_discount_type != undefined
            ? this.projectDetailsObj.exterior_discount_type
            : 65;
        this.projectDetailsObj.exterior_discount_value =
          this.projectDetailsObj.exterior_discount_value != undefined
            ? this.projectDetailsObj.exterior_discount_value
            : 0;
        this.projectDetailsObj.exterior_payment_method =
          this.projectDetailsObj.exterior_payment_method != undefined
            ? this.projectDetailsObj.exterior_payment_method
            : 1;
        this.projectDetailsObj.is_price_include_paint_material =
          this.projectDetailsObj.is_price_include_paint_material != undefined
            ? this.projectDetailsObj.is_price_include_paint_material
            : true;

        if (this.projectDetailsObj.dynamicProjectsArray.length > 0) {
          this.projectDetailsObj.dynamicProjectsArray.forEach((element) => {
            this.subProjectItemsObj.item_id =
              element.other_project_descriptions;
          });

          for (
            let i = 1;
            i < this.projectDetailsObj.dynamicProjectsArray.length;
            i++
          ) {
            this.clickCounter = this.clickCounter + 1;
          }
        }

        if (this.projectDetailsObj.dynamicPaintAreaArray.length > 0) {
          for (
            let i = 1;
            i < this.projectDetailsObj.dynamicPaintAreaArray.length;
            i++
          ) {
            this.paintAreaClickCounter = this.paintAreaClickCounter + 1;
          }
        }

        if (this.projectDetailsObj.dynamicNotesAreaArray.length > 0) {
          for (
            let i = 1;
            i < this.projectDetailsObj.dynamicNotesAreaArray.length;
            i++
          ) {
            this.notesAreaClickCounter = this.notesAreaClickCounter + 1;
          }
        }

        this.projectDetailsObj.project_id = res.estimate.project_id;

        // if (this.projectDetailsObj.dynamicProjectsArray == null || this.projectDetailsObj.dynamicProjectsArray == undefined || this.projectDetailsObj.dynamicProjectsArray.length == 0) {
        //   this.otherDescriptionObj = new OtherDescription();
        //   this.projectDetailsObj.dynamicProjectsArray.push(this.otherDescriptionObj);
        //   this.clickCounter = this.clickCounter + 1;
        // }

        // if (this.projectDetailsObj.dynamicPaintAreaArray == null || this.projectDetailsObj.dynamicPaintAreaArray == undefined || this.projectDetailsObj.dynamicPaintAreaArray.length == 0) {

        //   this.interiorPaintsObj = new InteriorPaints();
        //   this.projectDetailsObj.dynamicPaintAreaArray.push(this.interiorPaintsObj);
        //   this.paintAreaClickCounter = this.paintAreaClickCounter + 1;
        // }

        // if (this.projectDetailsObj.dynamicNotesAreaArray == null || this.projectDetailsObj.dynamicNotesAreaArray == undefined || this.projectDetailsObj.dynamicNotesAreaArray.length == 0) {
        //   this.interiorDescriptionObj = new InteriorDescription();
        //   this.projectDetailsObj.dynamicNotesAreaArray.push(this.interiorDescriptionObj);
        //   this.notesAreaClickCounter = this.notesAreaClickCounter + 1;
        // }

        // this.projectDetailsID = res.estimate[0].id;
        // this.projectDetailsObj.dynamicProjectsArray = res.estimate;

        if (
          this.projectDetails.project_type_id == 4 ||
          this.projectDetails.project_type_id == 5 ||
          this.projectDetails.project_type_id == 6
        ) {
          this.calculateProjectDescriptionCost();
        } else if (this.projectDetails.project_type_id == 2) {
          // this.calculateProjectInteriorPaintCost();
          this.projectDetailsObj.interior_final_price =
            +res.estimate.final_price;
          this.projectDetailsObj.interior_subtotal =
            +res.estimate.estimate_subtotal;
        } else {
          this.projectDetailsObj.exterior_net_amount =
            +res.estimate.estimate_subtotal;
          this.projectDetailsObj.exterior_price = +res.estimate.final_price;
          // this.onCaluculateExteriorPrice();
        }
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetWorkOrder(id: number) {
    this._adminsideService.getWorkOrder(id).subscribe(
      (res: any) => {
        this.projectDetailsObj = res.estimate;
        this.projectDetailsObj.dynamicProjectsArray = res.other_descriptions;
        this.projectDetailsObj.dynamicPaintAreaArray = res.interiorpaints;
        this.projectDetailsObj.dynamicNotesAreaArray = res.interior_description;

        this.projectDetailsObj.project_id = res.estimate.project_id;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetAllEstimates() {
    // // getProjectExpensesMeta

    this._adminService.getEstimates().subscribe(
      (res: any) => {
        this.estimateDetails = res.estimatedetails;
        // this.projectDetailsObj = res.estimatedetails[0];
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  onEditEstimate() {
    // onEditCustomerPayment()
    this.projectDetailsObj.project_id = this.projectID;
    // this.projectDetailsObj.price_subtotal =
    //   this.projectDetailsObj.exterior_net_amount;
    // console.log(this.projectDetailsObj.price_subtotal);
    // console.log(this.projectDetailsObj.exterior_net_amount);
    // return;
    // this.projectDetailsObj.pric =
    //   this.projectDetailsObj.exterior_net_amount;
    this._adminService.updateEstimate(this.projectDetailsObj).subscribe(
      (res: any) => {
        // this.projectDetailsObj = res;

        // this.projectDetailsObj.dynamicProjectsArray.push();

        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.message);
      }
    );
  }

  // addFieldValue() {
  //   this.projectDetailsObj.dynamicProjectsArray.push(this.otherDescriptionObj);
  //   this.otherDescriptionObj = new OtherDescription();
  //   this.clickCounter = this.clickCounter + 1;
  // }

  addPaintAreaFieldValue() {
    this.interiorPaintsObj = new InteriorPaints();
    this.projectDetailsObj.dynamicPaintAreaArray.push(this.interiorPaintsObj);

    // this.projectDetailsObj.dynamicPaintAreaArray.push(this.interiorPaintsObj);
    // this.interiorPaintsObj.project_details_id = this.projectID;
    this.paintAreaClickCounter = this.paintAreaClickCounter + 1;
  }

  // addNotesAreaFieldValue() {
  //   this.interiorDescriptionObj = new InteriorDescription();
  //   this.projectDetailsObj.dynamicNotesAreaArray.push(this.interiorDescriptionObj);
  //   this.notesAreaClickCounter = this.notesAreaClickCounter + 1;
  // }

  addExpenseItemsFieldValue() {
    this.projectExpensesObj.expenseItemsArray.push(this.projectExpenseItemsObj);
    this.projectExpenseItemsObj = new ExpenseItems();
    this.expenseItemsAreaClickCounter = this.expenseItemsAreaClickCounter + 1;
  }

  deleteFieldValue(idx) {
    this.projectDetailsObj.dynamicProjectsArray.splice(idx, 1);
    this.clickCounter = this.clickCounter - 1;
  }

  deletePaintAreaFieldValue(idx) {
    this.projectDetailsObj.dynamicPaintAreaArray.splice(idx, 1);
    this.paintAreaClickCounter = this.paintAreaClickCounter - 1;
  }

  deleteNotesAreaFieldValue(idx) {
    this.projectDetailsObj.dynamicNotesAreaArray.splice(idx, 1);
    this.notesAreaClickCounter = this.notesAreaClickCounter - 1;
  }

  deleteExpenseItemsAreaFieldValue(idx) {
    this.projectExpensesObj.expenseItemsArray.splice(idx, 1);
    this.expenseItemsAreaClickCounter = this.expenseItemsAreaClickCounter - 1;
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }

  navigateToAddProjects() {
    this.showSubProjectsMainContent = false;
    this.isSubProjectEdit = false;
    this._sharedService.countToShowProjects = undefined;
    this.subProjectsArray = new Array<SubProjects>();
  }

  navigateToAddExpense() {
    this.showMainContent = false;
    this.projectExpensesObj = new ProjectExpenses();
    this.projectExpenseItemsObj = new ExpenseItems();
  }

  onAddDesriptionPrice() {
    var total = 0;
    this.projectDetailsObj.dynamicProjectsArray.forEach((element) => {
      total = total + element.other_price;
    });

    if (total <= 0) {
      total = 0;
    }

    this.projectDetailsObj.estimate_subtotal = total;
    this.projectDetailsObj.discount_amount = 0;
    this.projectDetailsObj.estimate_net_amount = 0;
    this.projectDetailsObj.final_price = total;
  }

  onChangeDiscountType() {
    if (this.projectDetailsObj.discount_type == 65) {
      this.projectDetailsObj.discount_amount =
        (this.projectDetailsObj.estimate_subtotal / 100) *
        this.projectDetailsObj.estimate_discount_value;
      if (
        this.projectDetailsObj.discount_amount <=
        this.projectDetailsObj.estimate_subtotal
      ) {
        this.amountAfterDiscount =
          this.projectDetailsObj.estimate_subtotal -
          this.projectDetailsObj.discount_amount;
      } else {
        this.projectDetailsObj.discount_amount = 0;
      }
    } else {
      this.projectDetailsObj.discount_amount =
        this.projectDetailsObj.estimate_discount_value;
      if (
        this.projectDetailsObj.discount_amount <=
        this.projectDetailsObj.estimate_subtotal
      ) {
        this.amountAfterDiscount =
          this.projectDetailsObj.estimate_subtotal -
          this.projectDetailsObj.discount_amount;
      } else {
        this.projectDetailsObj.discount_amount = 0;
      }
    }
  }

  onChangePaymentMethod() {
    if (this.projectDetailsObj.discount_payment_method == 3) {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.estimate_net_amount =
          (this.amountAfterDiscount / 100) * 3;
        this.projectDetailsObj.final_price =
          this.amountAfterDiscount + this.projectDetailsObj.estimate_net_amount;
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.estimate_net_amount =
          (this.projectDetailsObj.estimate_subtotal / 100) * 3;
        this.projectDetailsObj.final_price =
          this.projectDetailsObj.estimate_subtotal +
          this.projectDetailsObj.estimate_net_amount;
      }
    } else {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.final_price =
          this.amountAfterDiscount + this.projectDetailsObj.estimate_net_amount;
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.final_price =
          this.projectDetailsObj.estimate_subtotal +
          this.projectDetailsObj.estimate_net_amount;
      }
    }

    if (this.projectDetailsObj.final_price <= 0) {
      this.projectDetailsObj.final_price = 0;
    }
  }

  onBlurQuantity(index: number) {
    if (
      this.projectExpensesObj.expenseItemsArray[index].price != undefined &&
      this.projectExpensesObj.expenseItemsArray[index].quantity != undefined
    ) {
      this.projectExpensesObj.expenseItemsArray[index].total_price =
        this.projectExpensesObj.expenseItemsArray[index].price *
        this.projectExpensesObj.expenseItemsArray[index].quantity;
    }
  }

  onBlurObjectQuantity() {
    if (
      this.projectExpenseItemsObj.price != undefined &&
      this.projectExpenseItemsObj.quantity != undefined
    ) {
      this.projectExpenseItemsObj.total_price =
        this.projectExpenseItemsObj.price *
        this.projectExpenseItemsObj.quantity;
    }
  }

  onAddDescription() {
    this.otherDescriptionObj.project_details_id = this.projectDetailsObj.id;
    this._adminsideService.addDescription(this.otherDescriptionObj).subscribe(
      (res: any) => {
        this.otherDescriptionObj.id = res.id;
        this.projectDetailsObj.dynamicProjectsArray.push(
          this.otherDescriptionObj
        );
        this.otherDescriptionObj = new OtherDescription();
        // this.otherDescriptionObj = new OtherDescription();
        // this.projectDetailsObj.dynamicProjectsArray.push(this.otherDescriptionObj);
        this.calculateProjectDescriptionCost();
        this._sharedService.success("Description added successfully");
      },
      (error) => {
        this._sharedService.error("Something went wrong");
      }
    );
  }

  onUpdateDescription(description: OtherDescription) {
    this.other_description_obj = description;
    this._adminsideService
      .updateDescription(this.other_description_obj)
      .subscribe(
        (res: any) => {
          // this.projectDetailsObj.dynamicProjectsArray.splice(index,1)
          // this.other_description_obj.id = res.id ;
          // this.projectDetailsObj.dynamicProjectsArray.push(this.other_description_obj)
          this.calculateProjectDescriptionCost();
          this._sharedService.success("Description updated successfully");
        },
        (error) => {
          this._sharedService.error("Something went wrong");
        }
      );
  }

  onDeleteDescription(id: number) {
    this._adminsideService.deleteDescription(id).subscribe(
      (res: any) => {
        var index = this.projectDetailsObj.dynamicProjectsArray.findIndex(
          (item) => item.id == id
        );
        this.projectDetailsObj.dynamicProjectsArray.splice(index, 1);
        this.calculateProjectDescriptionCost();
        this._sharedService.success("Description deleted successfully");
      },
      (error) => {
        this._sharedService.error("Something went wrong");
      }
    );
  }

  calculateProjectDescriptionCost() {
    var total = 0;
    this.projectDetailsObj.dynamicProjectsArray.forEach((element) => {
      total = total + +element.other_price;
    });

    total =
      this.projectDetailsObj.deposit_amount != undefined
        ? total - this.projectDetailsObj.deposit_amount
        : total;
    if (total <= 0) {
      total = 0;
    }

    this.projectDetailsObj.estimate_subtotal = total;
    this.projectDetailsObj.discount_amount = 0;
    this.projectDetailsObj.estimate_net_amount = 0;
    this.projectDetailsObj.final_price = total;

    if (this.projectDetailsObj.discount_type == 65) {
      this.projectDetailsObj.discount_amount = parseFloat(
        (
          (this.projectDetailsObj.estimate_subtotal / 100) *
          this.projectDetailsObj.estimate_discount_value
        ).toFixed(2)
      );
      if (
        this.projectDetailsObj.discount_amount <=
        this.projectDetailsObj.estimate_subtotal
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.estimate_subtotal -
            this.projectDetailsObj.discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.discount_amount = 0;
      }
    } else if (this.projectDetailsObj.discount_type == 67) {
      this.projectDetailsObj.discount_amount =
        this.projectDetailsObj.estimate_discount_value;
      if (
        this.projectDetailsObj.discount_amount <=
        this.projectDetailsObj.estimate_subtotal
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.estimate_subtotal -
            this.projectDetailsObj.discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.discount_amount = 0;
      }
    } else {
      this.projectDetailsObj.discount_amount = 0;
      this.amountAfterDiscount = parseFloat(
        (
          this.projectDetailsObj.estimate_subtotal -
          this.projectDetailsObj.discount_amount
        ).toFixed(2)
      );
    }
    if (this.projectDetailsObj.discount_payment_method == 3) {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.estimate_net_amount = parseFloat(
          ((this.amountAfterDiscount / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.final_price =
          this.amountAfterDiscount + this.projectDetailsObj.estimate_net_amount;
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.estimate_net_amount = parseFloat(
          ((this.projectDetailsObj.estimate_subtotal / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.final_price = parseFloat(
          (
            this.projectDetailsObj.estimate_subtotal +
            this.projectDetailsObj.estimate_net_amount
          ).toFixed(2)
        );
      }
    } else {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.final_price =
          this.amountAfterDiscount + this.projectDetailsObj.estimate_net_amount;
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.final_price = parseFloat(
          (
            this.projectDetailsObj.estimate_subtotal +
            this.projectDetailsObj.estimate_net_amount
          ).toFixed(2)
        );
      }
    }

    if (this.projectDetailsObj.final_price <= 0) {
      this.projectDetailsObj.final_price = 0;
    }
  }

  calculateProjectInteriorPaintCost() {
    var total = 0;
    this.projectDetailsObj.dynamicPaintAreaArray.forEach((element) => {
      total = total + +element.price;
    });

    this.projectDetailsObj.dynamicNotesAreaArray.forEach((element) => {
      total = total + +element.interior_final_price;
    });

    total = total + +this.projectDetailsObj.carpentery_amount;

    total =
      this.projectDetailsObj.interior_deposit_amount != undefined
        ? total - this.projectDetailsObj.interior_deposit_amount
        : total;

    if (total <= 0) {
      total = 0;
    }

    this.projectDetailsObj.interior_subtotal = total;
    this.projectDetailsObj.interior_discount_amount = 0;
    this.projectDetailsObj.interior_net_amount = 0;
    this.projectDetailsObj.interior_final_price = total;

    if (this.projectDetailsObj.interior_discount_type == 65) {
      this.projectDetailsObj.interior_discount_amount = parseFloat(
        (
          (this.projectDetailsObj.interior_subtotal / 100) *
          this.projectDetailsObj.interior_discount_value
        ).toFixed(2)
      );
      if (
        this.projectDetailsObj.interior_discount_amount <=
        this.projectDetailsObj.interior_subtotal
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.interior_subtotal -
            this.projectDetailsObj.interior_discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.interior_discount_amount = 0;
      }
    } else if (this.projectDetailsObj.interior_discount_type == 67) {
      this.projectDetailsObj.interior_discount_amount =
        this.projectDetailsObj.interior_discount_value;
      if (
        this.projectDetailsObj.interior_discount_amount <=
        this.projectDetailsObj.interior_subtotal
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.interior_subtotal -
            this.projectDetailsObj.interior_discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.interior_discount_amount = 0;
      }
    } else {
      this.projectDetailsObj.interior_discount_amount = 0;
      this.amountAfterDiscount = parseFloat(
        (
          this.projectDetailsObj.interior_subtotal -
          this.projectDetailsObj.interior_discount_amount
        ).toFixed(2)
      );
    }

    if (this.projectDetailsObj.interior_payment_method == 3) {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.interior_net_amount = parseFloat(
          ((this.amountAfterDiscount / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.interior_final_price = parseFloat(
          (
            this.amountAfterDiscount +
            this.projectDetailsObj.interior_net_amount
          ).toFixed(2)
        );
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.estimate_net_amount = parseFloat(
          ((this.projectDetailsObj.interior_subtotal / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.interior_final_price = parseFloat(
          (
            this.projectDetailsObj.interior_subtotal +
            this.projectDetailsObj.interior_net_amount
          ).toFixed(2)
        );
      }
    } else {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.interior_final_price = parseFloat(
          (
            this.amountAfterDiscount +
            this.projectDetailsObj.interior_net_amount
          ).toFixed(2)
        );
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.interior_final_price = parseFloat(
          (
            this.projectDetailsObj.interior_subtotal +
            this.projectDetailsObj.interior_net_amount
          ).toFixed(2)
        );
      }
    }
  }

  onAddInteriorPaint() {
    if (
      this.interiorPaintsObj.coat_1 == undefined &&
      this.interiorPaintsObj.coat_2 == undefined &&
      this.interiorPaintsObj.coat1_gallons == undefined &&
      this.interiorPaintsObj.coat2_gallons == undefined &&
      this.interiorPaintsObj.trim == undefined &&
      this.interiorPaintsObj.trim_coats == undefined &&
      this.interiorPaintsObj.trim_gallons == undefined &&
      this.interiorPaintsObj.closet == undefined &&
      this.interiorPaintsObj.ceiling_gallons == undefined &&
      this.interiorPaintsObj.ceiling_coats == undefined &&
      this.interiorPaintsObj.ceiling == undefined
    ) {
      this._sharedService.warning("Altleast one price field required");
    } else {
      this.interiorPaintsObj.project_details_id = this.projectDetailsObj.id;
      this._adminsideService.addInteriorPaint(this.interiorPaintsObj).subscribe(
        (res: any) => {
          this.interiorPaintsObj.id = res.id;
          this.projectDetailsObj.dynamicPaintAreaArray.push(
            this.interiorPaintsObj
          );
          this.interiorPaintsObj = new InteriorPaints();
          this._sharedService.success(
            "Interior paint details added successfully"
          );
          this.calculateProjectInteriorPaintCost();
        },
        (error) => {
          this._sharedService.error("Something went worng");
        }
      );
    }
  }

  onUpdateInteriorPaint(interiorPaint: InteriorPaints) {
    if (
      interiorPaint.coat_1 == undefined &&
      interiorPaint.coat_2 == undefined &&
      interiorPaint.coat1_gallons == undefined &&
      interiorPaint.coat2_gallons == undefined &&
      interiorPaint.trim == undefined &&
      interiorPaint.trim_coats == undefined &&
      interiorPaint.trim_gallons == undefined &&
      interiorPaint.closet == undefined &&
      interiorPaint.ceiling_gallons == undefined &&
      interiorPaint.ceiling_coats == undefined &&
      interiorPaint.ceiling == undefined
    ) {
      this._sharedService.warning("Altleast one price field required");
    } else {
      this._adminsideService.updateInteriorPaint(interiorPaint).subscribe(
        (res: any) => {
          this._sharedService.success(
            "Interior paint details updated successfully"
          );
          this.calculateProjectInteriorPaintCost();
        },
        (error) => {
          this._sharedService.error("Something went worng");
        }
      );
    }
  }

  onDeleteInteriorPaint(id: number) {
    this._adminsideService.deleteInteriorPaint(id).subscribe(
      (res: any) => {
        var index = this.projectDetailsObj.dynamicPaintAreaArray.findIndex(
          (item) => item.id == id
        );
        this.projectDetailsObj.dynamicPaintAreaArray.splice(index, 1);
        this._sharedService.success(
          "Interior description deleted successfully"
        );
        this.calculateProjectInteriorPaintCost();
      },
      (error) => {
        this._sharedService.error("Something went wrong");
      }
    );
  }

  onBlurInteriorPrice() {
    this.interiorPaintsObj.price =
      (this.interiorPaintsObj.coat_1 != undefined
        ? +this.interiorPaintsObj.coat_1
        : 0) +
      (this.interiorPaintsObj.coat_2 != undefined
        ? +this.interiorPaintsObj.coat_2
        : 0) +
      (this.interiorPaintsObj.trim != undefined
        ? +this.interiorPaintsObj.trim
        : 0) +
      (this.interiorPaintsObj.closet != undefined
        ? +this.interiorPaintsObj.closet
        : 0) +
      (this.interiorPaintsObj.ceiling != undefined
        ? +this.interiorPaintsObj.ceiling
        : 0);
  }

  onBlurInteriorPrices(index: number) {
    var interiorPiant: InteriorPaints;
    interiorPiant = this.projectDetailsObj.dynamicPaintAreaArray[index];

    interiorPiant.price =
      (interiorPiant.coat_1 != undefined ? +interiorPiant.coat_1 : 0) +
      (interiorPiant.coat_2 != undefined ? +interiorPiant.coat_2 : 0) +
      (interiorPiant.trim != undefined ? +interiorPiant.trim : 0) +
      (interiorPiant.closet != undefined ? +interiorPiant.closet : 0) +
      (interiorPiant.ceiling != undefined ? +interiorPiant.ceiling : 0);
    this.projectDetailsObj.dynamicPaintAreaArray[index] = interiorPiant;
  }

  onAddInteriorDesciption() {
    this.interiorDescriptionObj.project_details_id = this.projectDetailsObj.id;
    this._adminsideService
      .addInteriorDescription(this.interiorDescriptionObj)
      .subscribe(
        (res: any) => {
          this.interiorDescriptionObj.id = res.id;
          this.projectDetailsObj.dynamicNotesAreaArray.push(
            this.interiorDescriptionObj
          );
          this.interiorDescriptionObj = new InteriorDescription();
          this._sharedService.success(
            "Interior description added successfully"
          );
          this.calculateProjectInteriorPaintCost();
        },
        (error) => {
          this._sharedService.error("Something went wrong");
        }
      );
  }

  onUpdateInteriorDesciption(interiorDescription: InteriorDescription) {
    this._adminsideService
      .updateInteriorDescription(interiorDescription)
      .subscribe(
        (res: any) => {
          this._sharedService.success(
            "Interior description Updated successfully"
          );
          this.calculateProjectInteriorPaintCost();
        },
        (error) => {
          this._sharedService.error("Something went wrong");
        }
      );
  }
  onDeleteinteriorDescription(id: number) {
    this._adminsideService.deleteInteriorDescription(id).subscribe(
      (res: any) => {
        var index = this.projectDetailsObj.dynamicNotesAreaArray.findIndex(
          (item) => item.id == id
        );
        this.projectDetailsObj.dynamicNotesAreaArray.splice(index, 1);
        this.calculateProjectInteriorPaintCost();
        this._sharedService.success("Description deleted successfully");
      },
      (error) => {
        this._sharedService.error("Something went wrong");
      }
    );
  }

  onGetSubProjectItem() {
    this._adminService.getSubProjectItem(this.project_detail_id).subscribe(
      (res: any) => {
        this.sub_projects_items_array = res.sub_project_items_array;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onCaluculateExteriorPrice() {
    debugger;
    var total =
      (this.projectDetailsObj.pressure_wash_price != undefined
        ? +this.projectDetailsObj.pressure_wash_price
        : 0) +
      (this.projectDetailsObj.is_scrape_price != undefined
        ? +this.projectDetailsObj.is_scrape_price
        : 0) +
      (this.projectDetailsObj.is_windows_price != undefined
        ? +this.projectDetailsObj.is_windows_price
        : 0) +
      (this.projectDetailsObj.stucco_price != undefined
        ? +this.projectDetailsObj.stucco_price
        : 0) +
      (this.projectDetailsObj.prime_price != undefined
        ? +this.projectDetailsObj.prime_price
        : 0) +
      (this.projectDetailsObj.siding_price != undefined
        ? +this.projectDetailsObj.siding_price
        : 0) +
      (this.projectDetailsObj.trim_price != undefined
        ? +this.projectDetailsObj.trim_price
        : 0) +
      (this.projectDetailsObj.shutter_price != undefined
        ? +this.projectDetailsObj.shutter_price
        : 0) +
      (this.projectDetailsObj.bay_tops_price != undefined
        ? +this.projectDetailsObj.bay_tops_price
        : 0) +
      (this.projectDetailsObj.porch_price != undefined
        ? +this.projectDetailsObj.porch_price
        : 0) +
      (this.projectDetailsObj.paint_price != undefined
        ? +this.projectDetailsObj.paint_price
        : 0) +
      (this.projectDetailsObj.front_door_price != undefined
        ? +this.projectDetailsObj.front_door_price
        : 0) +
      (this.projectDetailsObj.decks_price != undefined
        ? +this.projectDetailsObj.decks_price
        : 0) +
      (this.projectDetailsObj.seal_price != undefined
        ? +this.projectDetailsObj.seal_price
        : 0) +
      (this.projectDetailsObj.carpentry_price != undefined
        ? +this.projectDetailsObj.carpentry_price
        : 0) +
      (this.projectDetailsObj.other_price != undefined
        ? +this.projectDetailsObj.other_price
        : 0);

    total =
      this.projectDetailsObj.exterior_deposit_amount != undefined
        ? total - this.projectDetailsObj.exterior_deposit_amount
        : total;

    if (total <= 0) {
      total = 0;
    }

    this.projectDetailsObj.exterior_net_amount = total;
    this.projectDetailsObj.exterior_discount_amount = 0;
    this.projectDetailsObj.exterior_payment_amount = 0;
    this.projectDetailsObj.exterior_price = total;

    if (this.projectDetailsObj.exterior_discount_type == 65) {
      this.projectDetailsObj.exterior_discount_amount = parseFloat(
        (
          (this.projectDetailsObj.exterior_net_amount / 100) *
          this.projectDetailsObj.exterior_discount_value
        ).toFixed(2)
      );
      if (
        this.projectDetailsObj.exterior_discount_amount <=
        this.projectDetailsObj.exterior_net_amount
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount -
            this.projectDetailsObj.exterior_discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.exterior_discount_amount = 0;
      }
    } else if (this.projectDetailsObj.exterior_discount_type == 67) {
      this.projectDetailsObj.exterior_discount_amount =
        this.projectDetailsObj.exterior_discount_value;
      if (
        this.projectDetailsObj.exterior_discount_amount <=
        this.projectDetailsObj.exterior_net_amount
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount -
            this.projectDetailsObj.exterior_discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.exterior_discount_amount = 0;
      }
    } else {
      this.projectDetailsObj.exterior_discount_amount = 0;
      this.amountAfterDiscount = parseFloat(
        (
          this.projectDetailsObj.exterior_net_amount -
          this.projectDetailsObj.exterior_discount_amount
        ).toFixed(2)
      );
    }
    if (this.projectDetailsObj.exterior_payment_method == 3) {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.exterior_payment_amount = parseFloat(
          ((this.amountAfterDiscount / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.amountAfterDiscount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.estimate_net_amount = parseFloat(
          ((this.projectDetailsObj.exterior_net_amount / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      }
    } else {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.amountAfterDiscount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      }
    }
  }
  onSubTotalInsertCaluculateExteriorPrice() {
    debugger;
    var total = this.projectDetailsObj.exterior_net_amount;

    total =
      this.projectDetailsObj.exterior_deposit_amount != undefined
        ? total - this.projectDetailsObj.exterior_deposit_amount
        : total;

    if (total <= 0) {
      total = 0;
    }

    this.projectDetailsObj.exterior_net_amount = total;
    this.projectDetailsObj.exterior_discount_amount = 0;
    this.projectDetailsObj.exterior_payment_amount = 0;
    this.projectDetailsObj.exterior_price = total;

    if (this.projectDetailsObj.exterior_discount_type == 65) {
      this.projectDetailsObj.exterior_discount_amount = parseFloat(
        (
          (this.projectDetailsObj.exterior_net_amount / 100) *
          this.projectDetailsObj.exterior_discount_value
        ).toFixed(2)
      );
      if (
        this.projectDetailsObj.exterior_discount_amount <=
        this.projectDetailsObj.exterior_net_amount
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount -
            this.projectDetailsObj.exterior_discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.exterior_discount_amount = 0;
      }
    } else if (this.projectDetailsObj.exterior_discount_type == 67) {
      this.projectDetailsObj.exterior_discount_amount =
        this.projectDetailsObj.exterior_discount_value;
      if (
        this.projectDetailsObj.exterior_discount_amount <=
        this.projectDetailsObj.exterior_net_amount
      ) {
        this.amountAfterDiscount = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount -
            this.projectDetailsObj.exterior_discount_amount
          ).toFixed(2)
        );
      } else {
        this.projectDetailsObj.exterior_discount_amount = 0;
      }
    } else {
      this.projectDetailsObj.exterior_discount_amount = 0;
      this.amountAfterDiscount = parseFloat(
        (
          this.projectDetailsObj.exterior_net_amount -
          this.projectDetailsObj.exterior_discount_amount
        ).toFixed(2)
      );
    }
    if (this.projectDetailsObj.exterior_payment_method == 3) {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.exterior_payment_amount = parseFloat(
          ((this.amountAfterDiscount / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.amountAfterDiscount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.estimate_net_amount = parseFloat(
          ((this.projectDetailsObj.exterior_net_amount / 100) * 3).toFixed(2)
        );
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      }
    } else {
      if (
        this.amountAfterDiscount != undefined ||
        this.amountAfterDiscount != 0
      ) {
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.amountAfterDiscount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      } else if (
        this.amountAfterDiscount == undefined ||
        this.amountAfterDiscount == 0
      ) {
        this.projectDetailsObj.exterior_price = parseFloat(
          (
            this.projectDetailsObj.exterior_net_amount +
            this.projectDetailsObj.exterior_payment_amount
          ).toFixed(2)
        );
      }
    }
  }

  // onAddSubProjectItem(sub_project_id: number,item_id: number)
  // {
  //   this.sub_project_item.sub_projects_id = sub_project_id;
  //   this
  // }
  paymentCollectedBy(id: number) {
    this.customerPaymentsObj.payment_collected_by = id;
  }
  expensepaymentCollectedBy(id: number) {
    this.projectExpensesObj.collected_by = id;
  }
  expenseOrderBy(id: number) {
    this.projectExpensesObj.ordered_by = id;
  }
}

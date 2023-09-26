import { Component, OnInit } from "@angular/core";
import { Customer } from "src/app/models/customer";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerInteractions } from "src/app/models/customer-interactions.model";
import { formatDate, DatePipe } from "@angular/common";
import { CustomerInteractionsFilter } from "src/app/models/customer-interactions-filter.model";
import { Project } from "src/app/models/project";
import { NgModel, NgForm } from "@angular/forms";

@Component({
  selector: "app-customer-interaction",
  templateUrl: "./customer-interaction.component.html",
  styleUrls: ["./customer-interaction.component.css"],
})
export class CustomerInteractionComponent implements OnInit {
  pcurrent_date: string;
  model: NgModel;
  customerObj: Customer;
  customerID: number;
  customerInteractionsObj: CustomerInteractions;
  customerInteractions: Array<CustomerInteractions>;
  customer_projects: Array<Project>;
  customerInteractionsFilterObj: CustomerInteractionsFilter;
  p: any;

  constructor(
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private _customerService: CustomerService,
    public _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.customerObj = new Customer();
    this.customerInteractions = new Array<CustomerInteractions>();
    this.customerInteractionsObj = new CustomerInteractions();
    this.customer_projects = new Array<Project>();
    this.customerInteractionsFilterObj = new CustomerInteractionsFilter();
    this.route.params.subscribe((params) => {
      this.customerID = +params["id"]; // (+) converts string 'id' to a number
      // this.onGetAllCustomerInteraction(this.customerID,this.current_date);
      console.log("this.current_date 1 : " + this.pcurrent_date);
      if (this.customerID != undefined && !isNaN(this.customerID)) {
        debugger;
        console.log("this.customerID" + this.customerID);
        this.onGetAllCustomerInteraction(this.customerID);
      } else {
        this.customerID = 0;
      }
    });

    if (this.route.snapshot.queryParams["pcurrent_date"] != undefined) {
      this.pcurrent_date = this.route.snapshot.queryParams["pcurrent_date"];
    }

    this.customerInteractionsFilterObj.is_show_appointments = true;
    this.customerInteractionsFilterObj.is_show_calls = true;
    this.customerInteractionsFilterObj.is_show_expenses = true;
    this.customerInteractionsFilterObj.is_show_notes = true;
    this.customerInteractionsFilterObj.is_show_payments = true;
    this.customerInteractionsFilterObj.is_show_projects = true;
    this.customerInteractionsFilterObj.customer_id = this.customerID;
    this.customerInteractionsFilterObj.customer_projects =
      this.customer_projects;
    this.customerInteractionsFilterObj.pcurrent_date = this.pcurrent_date;
    this.onFilterCustomerInteraction();
  }

  onFilterCustomerInteraction() {
    this.customerInteractionsFilterObj.customer_id = this.customerID;
    console.log("this.pcurrent_date : " + this.pcurrent_date);

    this.customerInteractionsFilterObj.pcurrent_date = this.pcurrent_date;

    if (this.customerInteractionsFilterObj.pcurrent_date == undefined) {
      this.customerInteractionsFilterObj.pcurrent_date = null;
    }

    this._customerService
      .getFilteredCustomerInteractions(this.customerInteractionsFilterObj)
      .subscribe(
        (res: any) => {
          console.log(
            "this.customerInteractionsFilterObj : " +
              JSON.stringify(this.customerInteractionsFilterObj)
          );
          this.customerInteractions = res.customer_interactions;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  onGetAllCustomerInteraction(id: number) {
    this._customerService.getCustomerInteractions(id).subscribe(
      (res: any) => {
        // this.customerInteractions = res.customer_interactions;
        this.customer_projects = res.customer_projects;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onAddNewNote(form: NgForm) {
    this.customerInteractionsObj.customer_id = this.customerID;
    this.customerInteractionsObj.interaction_type = "User Notes";
    this.customerInteractionsObj.performed_by_id =
      this._sharedService.userObj.id;
    this.customerInteractionsObj.performed_by =
      this._sharedService.userObj.first_name +
      " " +
      this._sharedService.userObj.last_name;
    this.customerInteractionsObj.created_at = formatDate(
      new Date(),
      "yyyy/MM/dd",
      "en"
    );

    this._customerService
      .createUserNote(this.customerInteractionsObj)
      .subscribe(
        (res: any) => {
          console.log(
            "this.customerInteractionsObj" +
              JSON.stringify(this.customerInteractionsObj)
          );
          this.customerInteractionsObj.id = res.id;

          var Obj = Object.assign({}, this.customerInteractionsObj);

          this.customerInteractions.push(Obj);

          this.resetForm(form);
          this._sharedService.success(res.success);
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  onViewAllCustomerCalls() {}

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
  }
}

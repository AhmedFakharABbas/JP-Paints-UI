import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Customer } from "src/app/models/customer";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { SearchCustomer } from "src/app/models/search-customer.model";
import { SearchDeletedCustomer } from "src/app/models/search-deleted-customer.model";

@Component({
  selector: "app-restore-customer",
  templateUrl: "./restore-customer.component.html",
  styleUrls: ["./restore-customer.component.css"],
})
export class RestoreCustomerComponent implements OnInit {
  deletedCustomersArray: Array<Customer>;
  p: any; //for pagination
  first_name: string;
  last_name: string;
  company: any;
  activeModalRef: NgbModalRef;
  searchCustomerObj: SearchCustomer;
  searchDeletedCustomerObj: SearchDeletedCustomer;
  cities: Array<string>;
  states: Array<string>;
  potential: Array<string>;
  activetedMOdalRef: NgbModalRef;
  customerObj: Customer;
  customerId: number;
  softDeletedCustomersArray: Array<Customer>;

  constructor(
    public _modalService: NgbModal,
    public _customerService: CustomerService,
    public _sharedService: SharedService
  ) {
    this.customerObj = new Customer();
  }

  ngOnInit() {
    this.softDeletedCustomersArray = new Array<Customer>();
    // this.searchCustomerObj = new SearchCustomer();
    this.searchDeletedCustomerObj = new SearchDeletedCustomer();
    this.deletedCustomersArray = new Array<Customer>();
    this.onGetSoftDeletedCustomers();
    this.onGetCustomersMeta();
  }

  onFilterCustomer() {}

  onGetSoftDeletedCustomers() {
    this._customerService.getSoftDeletedCustomers().subscribe(
      (res: any) => {
        this.softDeletedCustomersArray = res.customers;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onRestoreSoftDeletedCustomer() {
    this._customerService.restoreSoftDeletedCustomer(this.customerId).subscribe(
      (res: any) => {
        debugger;

        this.customerId = res.customer_id;

        var index = this.softDeletedCustomersArray.findIndex(
          (item) => item.customer_no == this.customerId
        );
        this.softDeletedCustomersArray.splice(index, 1);

        this.activetedMOdalRef.close();
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  openRestoreCustomer(modal: any, restore_id: number) {
    this.customerId = restore_id;
    this.activetedMOdalRef = this._modalService.open(modal);
  }

  onGetCustomersMeta() {
    this._customerService.getCustomersMeta().subscribe(
      (res: any) => {
        this.cities = res.cities;
        this.states = res.states;
        this.potential = res.potential;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetDeletedCustomerSearchFilterMeta() {
    this._customerService
      .getSoftDeletedCustomerSearchFilterMeta(this.searchDeletedCustomerObj)
      .subscribe(
        (res: any) => {
          this.softDeletedCustomersArray = res.deleted_customers;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  onResetResult() {
    this.searchDeletedCustomerObj = new SearchDeletedCustomer();
    this.onGetSoftDeletedCustomers();
  }
}

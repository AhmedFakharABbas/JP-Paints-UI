import { Component, OnInit } from "@angular/core";
import $ from "jquery";
import { Customer } from "src/app/models/customer";
import { NgForm, FormControl } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { GeneralService } from "src/app/services/general.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
FormControl;
@Component({
  selector: "app-create-customer",
  templateUrl: "./create-customer.component.html",
  styleUrls: ["./create-customer.component.css"],
})
export class CreateCustomerComponent implements OnInit {
  private customerDetail = [];
  subscription: Subscription;
  selectedCustomerToEdit: Customer;
  source_id: number;
  cities_id: number;
  state_id: number;
  reference_id: number;
  potentialType_id: number;
  reference_status_id: number;
  customerObj: Customer;
  customer_id: number;
  cities: Array<any>;
  statuses: Array<string>;
  states: Array<string>;
  sources: Array<string>;
  potential: Array<string>;
  customerID: number;
  customerData;
  defaultValue = "Select an option";
  cityContorl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    public _generalService: GeneralService,
    private router: Router,
    public _sharedService: SharedService,
    private _customerService: CustomerService
  ) {}

  ngOnInit() {
    this.customerObj = new Customer();
    this.route.params.subscribe((params) => {
      this.customerID = +params["id"]; // (+) converts string 'id' to a number
      if (
        this.customerID != undefined &&
        this.customerID != 0 &&
        !isNaN(this.customerID)
      )
        this.onGetCustomer(this.customerID);
      else {
        this.customerID = 0;
      }
    });
    this.onGetCustomersMeta();
  }

  onGetCustomer(id: number) {
    this._customerService.getCustomer(id).subscribe((res: any) => {
      this.customerObj = res.customer[0];
      this.customerObj.created_on = new Date(this.customerObj.created_on)
        .toISOString()
        .slice(0, 16);
    }),
      (err) => {};
  }

  onEditCustomer() {
    this._customerService.updateCustomer(this.customerObj).subscribe(
      (res: any) => {
        this._sharedService.success(res.success);
        // this.customerObj = res.customer;
        this.router.navigate(["/customer/all"]);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onCreateCustomer() {
    this._customerService
      .createCustomer(this.customerObj)
      .subscribe((res: any) => {
        if (
          this._sharedService.role_flags.is_administrator == true ||
          this._sharedService.role_flags.is_coordinator == true
        ) {
          this.router.navigate(["project/create"], {
            queryParams: { queryParam: res.id },
          });
        } else {
          this.router.navigate(["/customer/all"]);
        }
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onGetCustomersMeta() {
    this._customerService.getCustomersMeta().subscribe((res: any) => {
      this.cities = res.cities;
      this.sources = res.sources;
      this.states = res.states;
      this.statuses = res.statuses;
      this.potential = res.potential;

      this.filteredOptions = this.cityContorl.valueChanges.pipe(
        startWith(""),
        map((value) =>
          typeof value === "string"
            ? value
            : value != undefined
            ? value.name
            : value
        ),
        map((name) => (name ? this._filter(name) : this.cities.slice()))
      );
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  cityClicked(city) {
    this.customerObj.city_id = city.id;
  }
}

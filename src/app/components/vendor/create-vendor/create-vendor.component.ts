import { Component, OnInit } from "@angular/core";
import $ from "jquery";
import { Customer } from "src/app/models/customer";
import { NgForm, FormControl } from "@angular/forms";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { Vendor } from "src/app/models/vendor";
import { AdminSideService } from "src/app/services/admin-side.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
@Component({
  selector: "app-create-vendor",
  templateUrl: "./create-vendor.component.html",
  styleUrls: ["./create-vendor.component.css"],
})
export class CreateVendorComponent implements OnInit {
  customerObj: Customer;
  vendor: Vendor;
  cities_id: number;
  state_id: number;
  vendorObj: Vendor;
  cities: Array<any>;
  states: Array<string>;
  vendorID: number;
  vendorData;
  cityContorl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private _adminService: AdminSideService,
    public _customerService: CustomerService,
    public _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.vendorObj = new Vendor();
    this.route.params.subscribe((params) => {
      this.vendorID = +params["id"]; // (+) converts string 'id' to a number
      if (
        this.vendorID != undefined &&
        this.vendorID != 0 &&
        !isNaN(this.vendorID)
      )
        this.onGetVendor(this.vendorID);
      else {
        this.vendorID = 0;
      }
    });
    this.onGetRequiredData();
  }

  onCreateVendor() {
    this._adminService.createVendor(this.vendorObj).subscribe(
      (res: any) => {
        this._router.navigate(["/vendor/all"]);
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  onGetVendor(id: number) {
    //
    this._adminService.getVendor(id).subscribe(
      (res: any) => {
        this.vendorObj = new Vendor();
        this.vendorObj = res.vendor;
      },
      (err) => {}
    );
  }

  onEditVendor() {
    this._adminService.updateVendor(this.vendorObj).subscribe(
      (res: any) => {
        //
        this.vendorObj = res.vendor;
        this._router.navigate(["/vendor/all"]);
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetRequiredData() {
    this._adminService.getRequiredData().subscribe(
      (res: any) => {
        this.cities = res.cities;
        this.states = res.states;
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
      },
      (err) => {}
    );
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  cityClicked(city) {
    this.vendorObj.city = city.id;
  }
}

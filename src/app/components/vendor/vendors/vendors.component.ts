import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Customer } from "src/app/models/customer";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { Vendor } from "src/app/models/vendor";
import { AdminSideService } from "src/app/services/admin-side.service";

@Component({
  selector: "app-vendors",
  templateUrl: "./vendors.component.html",
  styleUrls: ["./vendors.component.css"],
})
export class VendorsComponent implements OnInit {
  activetedMOdalRef: NgbModalRef;
  vendorObj: Vendor;
  vendorId: number;
  vendorDetails: Array<Vendor>;
  p: number;
  constructor(
    private _adminService: AdminSideService,
    public _modalService: NgbModal,
    public _customerService: CustomerService,
    public _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.vendorObj = new Vendor();
    this.vendorDetails = new Array<Vendor>();
    this.OngetVendors();
  }

  ondeleteVendor(id: number) {
    this.activetedMOdalRef.close();
    this._adminService.deleteVendor(id).subscribe(
      (res: any) => {
        var index = this.vendorDetails.findIndex((item) => item.id == id);
        this.vendorDetails.splice(index, 1);
        this.p = 1;
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  openDeleteVendorModal(modal: any, vendor_id: number) {
    this.vendorId = vendor_id;
    this.activetedMOdalRef = this._modalService.open(modal, { size: "lg" });
  }

  OngetVendors() {
    this._adminService.getVendors().subscribe((res: any) => {
      this.vendorDetails = res.vendor;
    }),
      (error) => {
        this._sharedService.error(error.message);
      };
  }
}

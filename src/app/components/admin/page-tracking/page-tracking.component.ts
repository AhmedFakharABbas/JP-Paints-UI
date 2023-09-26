
import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-page-tracking',
  templateUrl: './page-tracking.component.html',
  styleUrls: ['./page-tracking.component.css']
})
export class PageTrackingComponent implements OnInit {

  activetedMOdalRef: NgbModalRef;
  customerObj: Customer
  customerId: number;
  constructor(public _modalService: NgbModal, public _customerService: CustomerService, public _sharedService: SharedService) {
    this.customerObj = new Customer();
  }

  ngOnInit() {
  }

  onFilterCustomer(){
    
  }
  deleteUser() {
    this._customerService.deleteCustomer(this.customerId,this.customerObj).subscribe((res: any) => {
      this._sharedService.success(res.success);
    }),
      error => {
        this._sharedService.error(error);
      }

  }
  openRestoreCustomer(modal: any, restore_id: number) {
    this.customerId = restore_id;
    this.activetedMOdalRef = this._modalService.open(modal)
  }


}

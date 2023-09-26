import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { SharedService } from 'src/app/services/shared.service';
import { PhoneCall } from 'src/app/models/phone-call.model';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-all-customer-calls',
  templateUrl: './all-customer-calls.component.html',
  styleUrls: ['./all-customer-calls.component.css']
})
export class AllCustomerCallsComponent implements OnInit {

  customer_id: number;
  allCustomerPhoneCalls: Array<PhoneCall>;
  activetedMOdalRef: NgbModalRef;
  phone_call_id: number;
  p: number;

  constructor(public route: ActivatedRoute, public _modalService: NgbModal, public _generalService: GeneralService, public _sharedService: SharedService) { }


  ngOnInit() {
    this.allCustomerPhoneCalls = new Array<PhoneCall>();
    this.customer_id = this.route.snapshot.queryParams['queryParam'] != undefined ? parseInt(this.route.snapshot.queryParams['queryParam']) : undefined;

    this.getAllCustomerCalls();
  }

  getAllCustomerCalls() {
    this._generalService.getAllCustomerCalls(this.customer_id).subscribe((res: any) => {
      this.allCustomerPhoneCalls = res.allCustomerPhoneCalls;
    }, (error) => {
      this._sharedService.error(error);
    })
  }


  DeleteScheduledPhoneCall(id: number) {
    this.activetedMOdalRef.close();
    this._generalService.deleteScheduledPhoneCall(this.phone_call_id).subscribe((res: any) => {
      this.p = 1;
      var index = this.allCustomerPhoneCalls.findIndex(item => item.id == this.phone_call_id);
      this.allCustomerPhoneCalls.splice(index,1);
      this._sharedService.success(res.success);
    },(error) => {
      this._sharedService.error(error);
    })
  }


  openAllCustomerPhoneCallsModal(modal: any, phone_call_id: number) {
    
    this.phone_call_id = phone_call_id;
    this.activetedMOdalRef = this._modalService.open(modal)
  }

}

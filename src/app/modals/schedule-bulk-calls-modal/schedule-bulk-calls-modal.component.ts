import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbCalendar, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { PhoneCall } from 'src/app/models/phone-call.model';
import { GeneralService } from 'src/app/services/general.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-schedule-bulk-calls-modal',
  templateUrl: './schedule-bulk-calls-modal.component.html',
  styleUrls: ['./schedule-bulk-calls-modal.component.css']
})
export class ScheduleBulkCallsModalComponent implements OnInit {

  activetedMOdalRef: NgbModalRef;
  model: NgbDateStruct;
  date: { year: number, month: number };

  phoneCallObj: PhoneCall;

  selectToday() {
    this.model = this.calendar.getToday();
  }

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal, public _modalService: NgbModal, public _generalService: GeneralService, public _sharedService: SharedService) {
    this.phoneCallObj = new PhoneCall();
  }

  ngOnInit() {

  }


}

import { ReferralSource } from './../../../models/referral-source';
import { AdminSideService } from './../../../services/admin-side.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../services/shared.service';
import { MarketingExpenditures } from 'src/app/models/marketing-expenditures.model';
import { isJSDocThisTag } from 'typescript';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {

  activetedMOdalRef: NgbModalRef;
  activetedMOdalRef2: NgbModalRef;
  referralSourceObj: MarketingExpenditures;
  marketingExpendituresArray: Array<MarketingExpenditures>;
  referralSourcesArray:Array<ReferralSource>;
  referralDetails: Array<MarketingExpenditures>;
  referralSourceId: number;
  p: any;
  constructor(public _modalService: NgbModal, private _adminService: AdminSideService, public _sharedService: SharedService) { }

  ngOnInit() {
    this.referralSourceObj = new MarketingExpenditures();
    this.referralDetails = new Array<MarketingExpenditures>();
    this.referralSourcesArray = new Array<ReferralSource>();
    this.marketingExpendituresArray = new Array<MarketingExpenditures>();
    this.getReferralSources();
    this.onGetMarketingExpenditures();
  }

  deleteMarketing() {
    
    this._adminService.deleteMarketingExpenditure(this.referralSourceId).subscribe((res: any) => {

      var index = this.referralDetails.findIndex(item => item.id == this.referralSourceId);
      if (index > -1) {
        var refIndex = this.marketingExpendituresArray.findIndex(item => item.id == this.referralSourceId);
        if (refIndex > -1) {
          this.referralDetails.splice(index, 1);
          this.marketingExpendituresArray.splice(index, 1);
        }
      }


      this._sharedService.success(res.success);
      this.activetedMOdalRef2.close();
      this.activetedMOdalRef.close();

    }, (error) => {
      this._sharedService.error(error);
    })
  }

  onCreateMarketingExpenditure() {
    this._adminService.createMarketingExpenditure(this.referralSourceObj).subscribe((res: any) => {
      this.referralSourceObj.id = res.id;
      // this.referralDetails = new Array<MarketingExpenditures>();
      
      var index = this.marketingExpendituresArray.findIndex(item => item.id == this.referralSourceObj.id);
      if (index > -1 && this.referralDetails != undefined) {
        this.referralDetails.push(this.referralSourceObj);
      }
 
     this.onGetMarketingExpenditures();
      // this.referralSourceObj = new MarketingExpenditures();
      this._sharedService.success(res.success);
    }),
      error => {
        this._sharedService.error(error);
      }
  }

  getReferralSources() {
    this._adminService.getReferralSources().subscribe((res: any) => {
      this.referralSourcesArray = res.referral_sources;
      // this.referralDetails = res.referralDetails;
    }),
      error => {
        this._sharedService.error(error);
      }
  }

  onGetMarketingExpenditures() {
    this._adminService.getAllMarketingExpenditures().subscribe((res: any) => {
      this.referralDetails = res.marketing_expenditure;
      // this.referralDetails = res.referralDetails;
    }),
      error => {
        this._sharedService.error(error);
      }
  }

  getReferralSourcesById() {
    
    this._adminService.getReferralSource(this.referralSourceId).subscribe((res: any) => {
      this.referralSourceObj = res;
    }),
      error => {
        this._sharedService.error(error);
      }
  }


  getMarketingExpenditureById() {
    
    // this.marketingExpendituresArray = new Array<MarketingExpenditures>();
    this._adminService.getMarketingExpenditure(this.referralSourceId).subscribe((res: any) => {
      // this.referralSourceObj = res.marketing_expenditure[0];
      this.marketingExpendituresArray = res.marketing_expenditure;
      // this.referralDetails = res.marketing_expenditure;
      // $marketing_expenditure
    }),
      error => {
        this._sharedService.error(error);
      }
  }


  opendetailMarketing(modal: any, referrel: ReferralSource) {
    this.referralSourceId = referrel.id;
    this.getMarketingExpenditureById();
    this.activetedMOdalRef = this._modalService.open(modal, { size: 'xl' })
  }

  opendeleteMarketing(modal: any, referrel: ReferralSource) {
    this.referralSourceId = referrel.id;
    this.activetedMOdalRef2 = this._modalService.open(modal)
  }

}

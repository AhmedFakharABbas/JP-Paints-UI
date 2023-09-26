import { ReferralSource } from "./../../../models/referral-source";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SharedService } from "src/app/services/shared.service";
import { AdminSideService } from "src/app/services/admin-side.service";

@Component({
  selector: "app-referrel-source",
  templateUrl: "./referrel-source.component.html",
  styleUrls: ["./referrel-source.component.css"],
})
export class ReferrelSourceComponent implements OnInit {
  activetedMOdalRef: NgbModalRef;
  referralSourceObj: ReferralSource;
  referralSources: Array<ReferralSource>;
  referralSourceId: number;
  p: any;
  constructor(
    public _modalService: NgbModal,
    private _adminSideService: AdminSideService,
    public _sharedService: SharedService
  ) {
    this.referralSourceObj = new ReferralSource();
  }

  ngOnInit() {
    this.referralSources = new Array<ReferralSource>();
    this.getReferralSources();
  }

  getReferralSources() {
    this._adminSideService.getReferralSources().subscribe((res: any) => {
      this.referralSources = res.referral_sources;
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  getReferralSourceById() {
    this._adminSideService
      .getReferralSource(this.referralSourceId)
      .subscribe((res: any) => {
        this.referralSourceObj = res.referral_source;
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onAddReferralSource() {
    this._adminSideService.addReferralSource(this.referralSourceObj).subscribe(
      (res: any) => {
        this.referralSourceObj.id = res.id;
        if (this.referralSources == undefined) {
          this.referralSources = new Array<ReferralSource>();
        }

        this.referralSources.push(this.referralSourceObj);
        this.referralSourceObj = new ReferralSource();

        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  updateReferralSource() {
    this._adminSideService
      .updateReferralSource(this.referralSourceObj)
      .subscribe((res: any) => {
        // this.activetedMOdalRef.dismiss('dismiss');
        this.activetedMOdalRef.close();
        var index = this.referralSources.findIndex(
          (item) => item.id == this.referralSourceObj.id
        );
        if (index > -1) {
          // this.referralSources.push()
          this.referralSources[index] = this.referralSourceObj;
        }
        this.referralSourceObj = new ReferralSource();
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onModalClose() {
    this.referralSourceObj = new ReferralSource();
  }

  deleteReferralSource() {
    this._adminSideService
      .deleteReferralSource(this.referralSourceId)
      .subscribe((res: any) => {
        var index = this.referralSources.findIndex(
          (item) => item.id == this.referralSourceId
        );
        if (index > -1) {
          this.referralSources.splice(index, 1);
        }
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  openReferralSource(modal: any, brand: ReferralSource) {
    this.referralSourceId = brand.id;
    // var data = JSON.stringify(brand);
    // this.referralSourceObj = new ReferralSource();
    this._adminSideService
      .getReferralSource(this.referralSourceId)
      .subscribe((res: any) => {
        this.referralSourceObj = res.referral_source[0];
        this.activetedMOdalRef = this._modalService.open(modal, { size: "lg" });
      }),
      (error) => {
        this._sharedService.error(error);
      };

    // this.referralSourceObj = JSON.parse(data);
  }
}

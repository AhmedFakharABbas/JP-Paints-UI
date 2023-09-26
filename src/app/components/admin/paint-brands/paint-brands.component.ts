import { AdminSideService } from "./../../../services/admin-side.service";
import { SharedService } from "./../../../services/shared.service";
import { PaintBrand } from "./../../../models/paint-brand";
import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-paint-brands",
  templateUrl: "./paint-brands.component.html",
  styleUrls: ["./paint-brands.component.css"],
})
export class PaintBrandsComponent implements OnInit {
  activetedMOdalRef: NgbModalRef;
  paintBrandObj: PaintBrand;
  paintBrands: Array<PaintBrand>;
  paintBrandId: number;
  p: any;
  constructor(
    public _modalService: NgbModal,
    private _adminSideService: AdminSideService,
    public _sharedService: SharedService
  ) {
    this.paintBrandObj = new PaintBrand();
  }

  ngOnInit() {
    this.getPaintBrands();
  }

  getPaintBrands() {
    this._adminSideService.getPaintBrands().subscribe((res: any) => {
      this.paintBrands = res.paint_brand;
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  getPaintBrandById(id: number) {
    this._adminSideService
      .getPaintBrand(this.paintBrandId)
      .subscribe((res: any) => {
        this.paintBrandObj = res.paint_brand[0];
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onAddPaintBrand() {
    this._adminSideService
      .addPaintBrand(this.paintBrandObj)
      .subscribe((res: any) => {
        this.paintBrandObj.id = res.id;
        this.paintBrandObj = new PaintBrand();
        if (this.paintBrands == undefined) {
          this.paintBrands = new Array<PaintBrand>();
        }
        this.getPaintBrands();
        this.paintBrands.push(this.paintBrandObj);
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onModalClose() {
    this.paintBrandObj = new PaintBrand();
  }

  updatePaintBrand() {
    this._adminSideService
      .updatePaintBrand(this.paintBrandObj)
      .subscribe((res: any) => {
        this.activetedMOdalRef.dismiss("dismiss");
        var index = this.paintBrands.findIndex(
          (item) => item.id == this.paintBrandObj.id
        );
        if (index > -1) {
          this.paintBrands[index] = this.paintBrandObj;
        }
        this.paintBrandObj = new PaintBrand();
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  deletePaintBrand() {
    this._adminSideService
      .deletePaintBrand(this.paintBrandId)
      .subscribe((res: any) => {
        var index = this.paintBrands.findIndex(
          (item) => item.id == this.paintBrandId
        );
        if (index > -1) {
          this.paintBrands.splice(index, 1);
        }
        this._sharedService.success(res.success);
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  openPaintBrand(modal: any, brand: PaintBrand) {
    this.paintBrandId = brand.id;
    // var data = JSON.stringify(brand);
    // this.paintBrandObj = new PaintBrand();
    // this.paintBrandObj = JSON.parse(data);
    this._adminSideService
      .getPaintBrand(this.paintBrandId)
      .subscribe((res: any) => {
        this.paintBrandObj = res.paint_brand[0];
        this.activetedMOdalRef = this._modalService.open(modal, { size: "lg" });
      }),
      (error) => {
        this._sharedService.error(error);
      };
  }
}

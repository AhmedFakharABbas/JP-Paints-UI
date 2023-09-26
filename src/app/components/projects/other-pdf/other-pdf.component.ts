import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-pdf',
  templateUrl: './other-pdf.component.html',
  styleUrls: ['./other-pdf.component.css']
})
export class OtherPdfComponent implements OnInit {

  project_information: any;
  project_descriptions: any;
  totalAmount: number = 0;
  spentAmount: number = 0;
  project_id: number;
  generatedPdfName: string;

  constructor(private _route: ActivatedRoute, public _sharedService: SharedService, private _adminsideService: AdminSideService) { }

  ngOnInit() {

    // this.onGetCustomerPayments(2);
    // this.onGetPDFData(2);
    // this.onGetAllProjectExpenses(2)

    this._route.params.subscribe(param => {
      this.project_id = +param['id'];
      if (!isNaN(this.project_id)) {
        this.onGetPDFData();
        //  this.onGetCustomerPayments(this.project_id);
      }
    });

  }

  public captureScreen() {
    this._sharedService.loading = true;
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight)
      pdf.save(this.generatedPdfName); // Generated PDF
      this._sharedService.loading = false;
    }, error => {
      this._sharedService.loading = false;
    });
  }

  onGetPDFData() {
    
    this._adminsideService.getPDFData(this.project_id).subscribe((res: any) => {
      this.project_information = res.project_information;
      this.project_descriptions = res.project_descriptions;

      if (this.project_information.project_type_id == 4) {
        this.generatedPdfName = "other" + this.project_id + ".pdf";
      } else if (this.project_information.project_type_id == 5) {
        this.generatedPdfName = "klean_ups" + this.project_id + ".pdf";
      } else if (this.project_information.project_type_id == 6) {
        this.generatedPdfName = "empowered" + this.project_id + ".pdf";
      }

    }, (error) => {
      this._sharedService.error(error);
    })
  }



}

import { Component, OnInit } from "@angular/core";
import $ from "jquery";
import { Customer } from "src/app/models/customer";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomerService } from "src/app/services/customer.service";
import { SharedService } from "src/app/services/shared.service";
import { SearchCustomer } from "src/app/models/search-customer.model";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { ngxCsv } from "ngx-csv";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Component({
  selector: "app-all-customers",
  templateUrl: "./all-customers.component.html",
  styleUrls: ["./all-customers.component.css"],
})
export class AllCustomersComponent implements OnInit {
  customerDetails: Array<Customer>;
  CurrentPageNo: number = 1;
  p: number; //for pagination
  first_name: string;
  last_name: string;
  company: any;
  activeModalRef: NgbModalRef;
  customerObj: Customer;
  customerId: number;
  searchCustomerObj: SearchCustomer;
  cities: Array<string>;
  states: Array<string>;
  potential: Array<string>;
  statuses: Array<string>;

  ToExportData: Array<any>;
  ToExportDataObj: any;

  customer_count: number;

  options = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalseparator: ".",
    showLabels: true,
    showTitle: false,
    title: "Your title",
    useBom: true,
    noDownload: false,
    headers: [
      "Customer ID",
      "First Name",
      "Last Name",
      "Company",
      "Email",
      "Home Phone",
      "Work Phone",
      "Fax Phone",
      "Line One",
      "Line Two",
      "City",
      "Country",
      "Zip",
      "Intersection",
      "Sub division",
    ],
  };

  constructor(
    public _modalService: NgbModal,
    public _customerService: CustomerService,
    public _sharedService: SharedService
  ) {
    // this._sharedService.loading = true;
  }

  ngOnInit() {
    this.customerObj = new Customer();
    this.searchCustomerObj = new SearchCustomer();
    this.customerDetails = new Array<Customer>();
    this.statuses = new Array<string>();
    // getting customers list //
    // this.OngetCustomers();
    this.onGetCustomersMeta();
    this.onGetCustomerSearchFilterMeta();
  }

  onFilterCustomer() {}

  OngetCustomers() {
    this._customerService.getCustomers().subscribe(
      (res: any) => {
        this.customerDetails = res.customers;
        // this._sharedService.success('data retrived Success');
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetCustomersMeta() {
    this._customerService.getCustomersMeta().subscribe((res: any) => {
      this.cities = res.cities;
      this.states = res.states;
      this.potential = res.potential;
      this.statuses = res.statuses;
    }),
      (error) => {
        this._sharedService.error(error);
      };
  }

  onGetCustomerSearchFilterMeta() {
    this._customerService
      .getCustomerSearchFilterMeta(this.searchCustomerObj, this.CurrentPageNo)
      .subscribe((res: any) => {
        this.customerDetails = res.customers;
        this.customer_count = res.customer_count;
        // this._sharedService.success('data retrived Success');
      }),
      (error) => {
        this._sharedService.error(error + "error occurred");
      };
  }

  openDeleteCustomerModal(modal: any, customer_id: number) {
    this.customerId = customer_id;
    this.activeModalRef = this._modalService.open(modal);
  }

  ondeleteCustomers(id: number) {
    this.activeModalRef.close();
    this._customerService.deleteCustomer(id, this.customerObj).subscribe(
      (res: any) => {
        var index = this.customerDetails.findIndex((item) => item.id == id);
        this.customerDetails.splice(index, 1);
        this.p = 1;
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  onResetResult() {
    this.searchCustomerObj = new SearchCustomer();
    this.CurrentPageNo = 1;
    this.onGetCustomerSearchFilterMeta();
  }

  onExportReportsToExcl(isExcel: boolean) {
    this.ToExportData = new Array<any>();

    if (this.customerDetails != undefined && this.customerDetails.length > 0) {
      // Creating Titles
      this.customerDetails.forEach((element) => {
        this.ToExportDataObj = new Object();
        this.ToExportDataObj["Customeer ID"] = element.id;
        this.ToExportDataObj["First Name"] = element.first_name;
        this.ToExportDataObj["Last Name"] = element.last_name;
        this.ToExportDataObj["Company"] = element.company;
        this.ToExportDataObj["Email"] = element.email;
        this.ToExportDataObj["Home Phone"] = element.home_phone;
        this.ToExportDataObj["Work Phone"] = element.work_phone;

        this.ToExportDataObj["Fax Phone"] = element.fax;
        this.ToExportDataObj["Line One"] = element.address_1;
        this.ToExportDataObj["Line Two"] = element.address_2;
        this.ToExportDataObj["City"] = element.city_name;
        this.ToExportDataObj["Country"] = element.state_name;
        this.ToExportDataObj["Zip"] = element.zip_code;
        this.ToExportDataObj["Intersection"] = element.major_intersection;
        this.ToExportDataObj["Sub division"] = element.sub_division_name;

        this.ToExportData.push(this.ToExportDataObj);
      });
      if (isExcel != true) {
        new ngxCsv(
          this.ToExportData,
          "customer" + "_export_" + new Date(),
          this.options
        );
      } else {
        this.exportAsExcelFile(this.ToExportData, "JP Customers");
      }
    } else {
      this._sharedService.warning("No customer present to print");
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date() + EXCEL_EXTENSION
    );
  }
}

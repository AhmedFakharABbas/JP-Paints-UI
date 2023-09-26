import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  NgZone,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import * as $ from "jquery";
import { Project } from "src/app/models/project";
import { AdminSideService } from "src/app/services/admin-side.service";
import { SharedService } from "src/app/services/shared.service";
import { Router } from "@angular/router";
import { Customer } from "src/app/models/customer";
import { SearchProject } from "src/app/models/search-project.model";
import { ngxCsv } from "ngx-csv/ngx-csv";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { Observable, of, from, Subject, concat } from "rxjs";
import {
  CdkVirtualScrollViewport,
  ScrollDispatcher,
} from "@angular/cdk/scrolling";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  tap,
  map,
  filter,
} from "rxjs/operators";
import { FormControl } from "@angular/forms";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

interface IServerResponse {
  items: string[];
  total: number;
}

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"],
})
export class ProjectsComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  virtualScroll: CdkVirtualScrollViewport;

  firstProjectID: number;
  lastProjectID: number;
  projectObj: Project;
  searchProjectObj: SearchProject;
  projects: Array<any>;
  activeModelRef: NgbModalRef;
  project_id: number;
  potential_types: Array<any>;
  project_types: Array<any>;
  statuses: Array<any>;
  supervisors: Array<string>;
  estimators: Array<string>;
  cities: Array<string>;
  states: Array<string>;
  crews: Array<string>;
  customers: Array<Customer>;
  customerSideSearchedArray: Array<any>;
  projectSideSearchedArray: Array<any>;
  ToExportData: Array<any>;
  ToExportDataObj: any;

  // estimatortextSearch$ = new Subject<string>();
  estimatortextSearch$ = new FormControl();
  crewtextSearch$ = new FormControl();
  searchLoading: boolean = false;

  // @Input('data') meals: string[] = [];
  // asyncMeals: Observable<string[]>;
  CurrentPageNo: number = 1;
  PreviousPageNo: number;
  total: number;
  loading: boolean;

  constSearchObject: SearchProject;

  data = [
    {
      name: "Test 1",
      age: 13,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' ",
    },
    {
      name: "Test 2",
      age: 11,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' ",
    },
    {
      name: "Test 4",
      age: 10,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' ",
    },
  ];

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
      "Project ID",
      "Date",
      "Customer",
      "Project Type Name",
      "Project Status",
      "Total Cost",
      "Last Payment Date",
    ],
  };

  searchResult$: Observable<any[]>;
  // searchResult1 : Array<any[]>;

  constructor(
    public _modelService: NgbModal,
    public _sharedService: SharedService,
    public _adminService: AdminSideService
  ) {}

  ngOnInit() {
    this.projectObj = new Project();
    this.searchProjectObj = new SearchProject();
    this.customerSideSearchedArray = new Array<any>();
    this.projectSideSearchedArray = new Array<any>();
    this.projects = new Array<any>();
    this.CurrentPageNo = 1;

    this.loading = true;
    this.firstProjectID = 0;
    this.lastProjectID = 0;

    this.onGetProjectSearchFilterMeta(true);
    this.onGetProjetsMeta();

    // this.searchResult$ = this.estimatortextSearch$.valueChanges.pipe(
    //   filter(res => {
    //     return res !== null && res.length >= 2;
    //   }),
    //   distinctUntilChanged(),
    //   debounceTime(800),
    //   tap(() => this.searchLoading = true),
    //   switchMap(term => {
    //     return this._adminService.getProjectSearchByKeyWords(term,'estimator',this._sharedService.userObj.id).pipe(
    //       catchError(() => of([])), // empty list on error
    //       tap(() => this.searchLoading = false)
    //     );
    //   }),
    //   map(item => {
    //     return item
    //   })
    // )
    this.estimatortextSearch$.valueChanges.subscribe((value) => {
      if (value.length >= 2) {
        debugger;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "estimator",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            console.log(response);
            this.searchResult$ = response.search_result;
          });
      } else {
        return null;
      }
    });

    this.crewtextSearch$.valueChanges.subscribe((value) => {
      if (value.length >= 2) {
        debugger;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "crew",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            console.log(response);
            this.searchResult$ = response.search_result;
          });
      } else {
        return null;
      }
    });

    // this.loadSearchResult();
  }

  onGetProjectSearchByKeyWords(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this._adminService
      .getProjectSearchByKeyWords(
        val,
        "estimator",
        this._sharedService.userObj.id
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  // WHERE id < lastId
  // limit 0,30

  // ngAfterViewInit(): void {debugger;

  //   this.scrollDispatcher.scrolled().pipe(
  //     filter(event => this.virtualScroll.getRenderedRange().end === this.virtualScroll.getDataLength())
  //   ).subscribe(event => {

  //     if(this.loading == true){
  //       this.p++;
  //       this.onGetProjectSearchFilterMeta(this.p);
  //       this.loading = false;
  //     }
  //     setTimeout( ()=> { this.loading = true; }, 500);
  //   })
  // }

  // filter(filter: string): any[] {
  //   this.lastFilter = filter;
  //   if (filter) {
  //     return this.users.filter(option => {
  //       return option.firstname.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  //         || option.lastname.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  //     })
  //   } else {
  //     return this.users.slice();
  //   }
  // }

  openProjectModel(modal: any, projectId: number) {
    this.project_id = projectId;
    this.activeModelRef = this._modelService.open(modal);
  }

  onGetProjetsMeta() {
    this._adminService.getProjectMeta().subscribe(
      (res: any) => {
        //

        this.potential_types = res.potential_types;
        this.project_types = res.project_types;
        // this.supervisors = res.supervisors;
        this.statuses = res.statuses;
        // this.estimators = res.estimators;
        // this.crews = res.crews;
        this.cities = res.cities;
        this.states = res.states;
        // this.customers = res.customers;
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  // onGetProjects() {
  //   this._adminService.getProjects().subscribe((res: any) => {
  //
  //     this.projects = ;
  //   }, (err) => {
  //
  //     this._sharedService.error(err);
  //   })
  // }

  deleteProject() {
    this.activeModelRef.close();
    this._adminService.deleteProject(this.project_id).subscribe(
      (res: any) => {
        var index = this.projects.findIndex(
          (item) => item.id == this.project_id
        );
        this.projects.splice(index, 1);
        this._sharedService.success(res.success);
        this.CurrentPageNo = 1;
        this.PreviousPageNo = 1;
      },
      (error) => {
        this._sharedService.error(error.error);
      }
    );
  }

  optionClicked(event: Event, type: string, id: number) {
    // this.toggleSelection(type,id);
    if (type == "estimator") {
      this.searchProjectObj.estimator_id = id;
    } else {
      this.searchProjectObj.crew_id = id;
    }
  }

  toggleSelection(type: string, id: number) {
    // const i = this.searchResult$.findIndex((value : any) => value.id == id);
    // this.searchProjectObj.estimator_id = this.searchResult$[i].id
    // this.searchResult$.map(items => {
    //   var index = items.findIndex(item => item.id == id)
    //   this.searchProjectObj.estimator_id = items[index].id
    // }
    //   )
  }

  onNavigateToProjectSearch(is_assign: boolean) {}

  onGetProjectSearchFilterMeta(is_assign: boolean) {
    if (is_assign == true) {
      if (
        this.searchProjectObj.start_date_to <
        this.searchProjectObj.start_date_from
      ) {
        this.searchProjectObj.start_date_to =
          this.searchProjectObj.start_date_from;
      }

      if (
        this.searchProjectObj.end_date_to < this.searchProjectObj.end_date_from
      ) {
        this.searchProjectObj.end_date_to = this.searchProjectObj.end_date_from;
      }

      if (
        this.searchProjectObj.create_date_to <
        this.searchProjectObj.create_date_from
      ) {
        this.searchProjectObj.create_date_to =
          this.searchProjectObj.create_date_from;
      }

      this.constSearchObject = Object.assign({}, this.searchProjectObj);
    }

    this._adminService
      .getProjectSearchFilterMeta(
        this.constSearchObject,
        this._sharedService.userObj.id,
        this.CurrentPageNo
      )
      .subscribe(
        (res: any) => {
          this.projects = res.searchResult;
          console.log(res);
          this.total = res.projects_count;
          this.PreviousPageNo = this.CurrentPageNo;
          this.projects.forEach((element, index) => {
            if (index === this.projects.length - 1) {
              this.lastProjectID = element.id;
              console.log("last project id : " + this.lastProjectID);
            }
            this.firstProjectID = this.projects[0].id;
          });

          console.log(
            "firstProjectID is : " + this.firstProjectID,
            "lastProjectID : " + this.lastProjectID,
            "previousPageNo is: " + this.PreviousPageNo,
            "currentPageNo is:" + this.CurrentPageNo
          );

          this._sharedService.projectsArray = res.searchResult;
          localStorage.setItem(
            "projectsArray",
            JSON.stringify(this._sharedService.projectsArray)
          );
        },
        (error) => {
          this._sharedService.error(error + "error occurred");
        }
      );
  }

  // getProjectSearchFilterMeta()
  // private fieldArray: Array<any> = [];
  // private newAttribute: any = {};
  // addFieldValue() {
  //   this.fieldArray.push(this.newAttribute)
  //   this.newAttribute = {};
  // }
  // deleteFieldValue(index) {
  //   this.fieldArray.splice(index, 1);
  // }

  onResetResult() {
    this.crewtextSearch$.setValue("");
    this.estimatortextSearch$.setValue("");

    this.searchProjectObj = new SearchProject();
    this.projects = new Array<any>();
    this.CurrentPageNo = 1;
    this.onGetProjectSearchFilterMeta(true);
    // this.onGetProjectSearchFilterMeta();
  }

  onExportReportsToExcl(isExcel: boolean) {
    this.ToExportData = new Array<any>();

    if (this.projects != undefined && this.projects.length > 0) {
      // Creating Titles
      this.projects.forEach((element) => {
        debugger;
        this.ToExportDataObj = new Object();
        this.ToExportDataObj["Project ID"] = element.id;
        this.ToExportDataObj["Date"] = element.created_at;
        this.ToExportDataObj["Customer"] =
          element.first_name + " " + element.last_name;
        this.ToExportDataObj["Project Type Name"] = element.project_type_name;
        this.ToExportDataObj["Project Status"] = element.project_status;
        this.ToExportDataObj["Total Cost"] =
          element.total_cost == undefined ? "-" : element.total_cost;
        this.ToExportDataObj["Last Payment Date"] =
          element.last_payment_date == undefined
            ? "-"
            : element.last_payment_date;

        this.ToExportData.push(this.ToExportDataObj);
      });
      if (isExcel != true) {
        new ngxCsv(
          this.ToExportData,
          "JP Projects" + "_export_" + new Date(),
          this.options
        );
      } else {
        this.exportAsExcelFile(this.ToExportData, "JP Projects");
      }
    } else {
      this._sharedService.warning("No project present to print");
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

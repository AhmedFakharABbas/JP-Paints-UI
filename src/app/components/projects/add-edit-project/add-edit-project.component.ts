import { Component, OnInit, ElementRef } from "@angular/core";
import { Project } from "src/app/models/project";
import { AdminSideService } from "src/app/services/admin-side.service";
import { SharedService } from "src/app/services/shared.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Customer } from "src/app/models/customer";
import { THIS_EXPR, IfStmt } from "@angular/compiler/src/output/output_ast";
import { count } from "rxjs-compat/operator/count";

// import { ImageCompressService } from 'ng2-image-compress';
import { ImagesCompressService } from "src/app/services/image-compress.service";
import { ProjectAttachments } from "src/app/models/ProjectAttachments";
import { isThursday } from "date-fns";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, NgForm } from "@angular/forms";
import { Observable } from "rxjs";
// import { ChangeDetectorRef } from "@angular/core";
// import { CustomHttpService } from 'src/app/services/custom-http.service';
import { map, startWith } from "rxjs/operators";
import { ConsoleService } from "@ng-select/ng-select/lib/console.service";
import { asLiteral } from "@angular/compiler/src/render3/view/util";
@Component({
  selector: "app-add-edit-project",
  templateUrl: "./add-edit-project.component.html",
  styleUrls: ["./add-edit-project.component.css"],
})
export class AddEditProjectComponent implements OnInit {
  assignedProjects: string;
  file: ProjectAttachments;
  assignedProjectsArray: Array<Project>;
  form: NgForm;
  projectID: number;
  projectObj: Project;
  users: Array<any>;
  potential_types: Array<any>;
  project_types: Array<any>;
  statuses: Array<any>;
  supervisors: Array<string>;
  estimators: Array<string>;
  cities: Array<any>;
  states: Array<string>;
  crews: Array<string>;
  customers: Array<Customer>;
  cityID: number;
  customerID: number;
  stateID: number;
  statusID: number;
  supervisorID: number;
  estimatorID: number;
  activeModelRef: NgbModalRef;
  crewID: number;
  projectTypeID: number;
  potentialTypeID: number;
  CustomerID: number;
  collection = [];
  customer: any;
  counter: number;
  customerName: string;
  supervisorName: string;
  isCustomersLoading: boolean;
  isSupervisorLoading: boolean;
  isEstimatorsLoading: boolean;
  isCrewsLoading: boolean;

  deleteAttachmentEncryptedName: string;
  deleteAttcahmentID: number;
  compresseFiles: Array<ProjectAttachments>;
  ProjectAttachments: ProjectAttachments;
  //customer search
  customerSearch = new FormControl();
  searchCustomers: Observable<any[]>;
  //supervisor
  searchSupervisors: Observable<any[]>;
  supervisorSearch = new FormControl();
  //Estimator
  searchEstimators: Observable<any[]>;
  estimatorSearch = new FormControl();
  //crew
  searchcrews: Observable<any[]>;
  crewSearch = new FormControl();

  estimatorName: string;
  crewName: string;

  cityContorl = new FormControl();

  filteredOptions: Observable<any[]>;
  customer_id: any;
  searchCustomersLength: any;
  supervisorsLength: any;
  estimatorsLength: any;
  searchcrewsLength: any;
  constructor(
    public _adminService: AdminSideService,
    private route: ActivatedRoute,
    public _sharedService: SharedService,
    private router: Router,
    private el: ElementRef,
    private _compressImagesService: ImagesCompressService,
    public _modelService: NgbModal // private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isCustomersLoading = false;
    this.isSupervisorLoading = false;
    this.isEstimatorsLoading = false;
    this.isCrewsLoading = false;
    this.customerName = "";
    this.supervisorName = "";
    this.estimatorName = "";
    this.crewName = "";
    this.assignedProjectsArray = new Array<Project>();
    this.projectObj = new Project();
    this.route.params.subscribe((params) => {
      this.projectID = +params["id"]; // (+) converts string 'id' to a number
    });
    this.projectObj.customer_id =
      this.route.snapshot.queryParams["queryParam"] != undefined
        ? parseInt(this.route.snapshot.queryParams["queryParam"])
        : undefined;
    this.customer_id = this.projectObj.customer_id;

    this.onGetProjetsMeta();

    //get the customers
    this.customerSearch.valueChanges.subscribe((value) => {
      if (value != undefined && value.length == 0) {
        //this.projectObj.customer_id == undefined;

        this.projectObj.customer_id = undefined;
        this.projectObj.customer_id = undefined;
        this.projectObj.address_1 = undefined;
        this.projectObj.address_2 = undefined;
        this.projectObj.city_id = undefined;
        this.projectObj.major_intersection = undefined;
        this.projectObj.state_id = undefined;
        this.projectObj.sub_division_name = undefined;
        this.projectObj.zip_code = undefined;
      }
      if (value != undefined && value.length >= 2) {
        this.isCustomersLoading = true;

        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "customers",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.searchCustomersLength = response.search_result.length;
            this.searchCustomers = response.search_result;
            this.isCustomersLoading = false;
          });
      } else {
        return null;
      }
    });
    //get the supervisor
    this.supervisorSearch.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.projectObj.supervisor_id = undefined;
      }
      if (value.length >= 2) {
        this.isSupervisorLoading = true;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "supervisor",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.supervisorsLength = response.search_result.length;
            this.searchSupervisors = response.search_result;
            this.isSupervisorLoading = false;
          });
      } else {
        return null;
      }
    });
    //get the estimators
    this.estimatorSearch.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.projectObj.estimator_id = undefined;
      }
      if (value.length >= 2) {
        this.isEstimatorsLoading = true;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "estimator",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.estimatorsLength = response.search_result.length;
            this.searchEstimators = response.search_result;
            this.isEstimatorsLoading = false;
          });
      } else {
        return null;
      }
    });
    //get the crew
    this.crewSearch.valueChanges.subscribe((value) => {
      if (value.length == 0) {
        this.projectObj.crew_id = undefined;
      }
      if (value.length >= 2) {
        this.isCrewsLoading = true;
        this._adminService
          .getProjectSearchByKeyWords(
            value,
            "crew",
            this._sharedService.userObj.id
          )
          .subscribe((response: any) => {
            this.searchcrewsLength = response.search_result.length;
            this.searchcrews = response.search_result;
            this.isCrewsLoading = false;
          });
      } else {
        return null;
      }
    });
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.cities.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  displayFn(user: any): string {
    debugger;
    return user && user.name ? user.name : "";
  }
  onGetProject(id: number) {
    this._adminService.getSingleProject(id).subscribe(
      (res: any) => {
        if (res.customers.length == 1) {
          this.customerName = res.customers[0].customer_name;
        }
        if (res.crew.length == 1) {
          this.crewName = res.crew[0].crew_name;
        }
        if (res.supervisor.length == 1) {
          this.supervisorName = res.supervisor[0].supervisor_name;
        }
        if (res.estimator.length == 1) {
          this.estimatorName = res.estimator[0].estimator_name;
        }

        this.projectObj = res.project;
        if (res.project.start_date != null) {
          res.project.start_date = res.project.start_date.slice(0, 10);
        }
        if (res.project.end_date != null) {
          res.project.end_date = res.project.end_date.slice(0, 10);
        }
        this.customers = res.customers;
        this.projectObj.attachments = res.project_attachments;
        console.log(this.projectObj.is_customer_address);

        // if (this.projectObj.customer_id != undefined) {
        //   this.onSelectCustomerAddress();
        // }
        if (this.projectObj.is_customer_address == 1) {
          this.onSelectCustomerAddress();
        }

        console.log(this.projectObj);
        console.log(this.projectObj.city_id);
        console.log(this.projectObj.city_name);
      },
      (err) => {
        this._sharedService.error(err);
      }
    );
  }

  onCreateProject() {
    if (
      this.projectObj.customer_id != undefined &&
      (this.projectObj.city_id != undefined ||
        this.projectObj.is_customer_address == 0)
    ) {
      if (this.projectObj.end_date < this.projectObj.start_date) {
        this.projectObj.end_date = this.projectObj.start_date;
      }
      // console.log(this.projectObj);
      this._adminService.createProject(this.projectObj).subscribe(
        (res: any) => {
          this.router.navigate(["/project/all"]);
          this._sharedService.success(res.success);
        },
        (error) => {
          this._sharedService.error(error.error);
        }
      );
    }
  }

  onEditProject() {
    if (this.projectObj.end_date < this.projectObj.start_date) {
      this.projectObj.end_date = this.projectObj.start_date;
    }
    this._adminService.updateProject(this.projectObj).subscribe(
      (res: any) => {
        this.router.navigate(["/project/all"]);
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onGetProjetsMeta() {
    // alert("metal call");
    if (this.customer_id == undefined) {
      this._adminService.getProjectMeta().subscribe(
        (res: any) => {
          this.potential_types = res.potential_types;

          // this.users = res.users;
          // this.estimators = res.estimators;
          // this.crews = res.crews;
          this.project_types = res.project_types;
          this.statuses = res.statuses;
          this.cities = res.cities;
          // alert(this.projectObj.city_name);

          this.filteredOptions = this.cityContorl.valueChanges.pipe(
            startWith(""),
            map((value) =>
              typeof value === "string"
                ? value
                : value != undefined
                ? value.name
                : value
            ),
            map((name) => (name ? this._filter(name) : this.cities.slice()))
          );

          this.states = res.states;

          if (
            this.projectID != undefined &&
            this.projectID != 0 &&
            !isNaN(this.projectID)
          )
            this.onGetProject(this.projectID);
          else {
            this.projectID = 0;
          }

          this.assignedProjects = localStorage.getItem("projectsArray");
          this.assignedProjectsArray = JSON.parse(this.assignedProjects);
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
    } else {
      this._adminService.getCustomerProjectMeta(this.customer_id).subscribe(
        (res: any) => {
          this.potential_types = res.potential_types;

          this.project_types = res.project_types;

          this.statuses = res.statuses;
          this.cities = res.cities;
          this.states = res.states;
          let customer = res.customer[0];
          this.customerName = customer.first_name + " " + customer.last_name;
          this.projectObj.customer_id = customer.id;
          this.projectObj.address_1 = customer.address_1;
          this.projectObj.address_2 = customer.address_2;
          this.projectObj.city_id = customer.city_id;
          this.projectObj.city_name = customer.city_name;
          this.projectObj.major_intersection = customer.major_intersection;
          this.projectObj.state_id = customer.state_id;
          this.projectObj.sub_division_name = customer.sub_division_name;
          this.projectObj.zip_code = customer.zip_code;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
    }
  }

  onSelectCustomerAddress() {
    if (this.customers != undefined) {
      var index = this.customers.findIndex(
        (item) => item.id == this.projectObj.customer_id
      );
    }
    if (index >= 0) {
      this.projectObj.address_1 = this.customers[index].address_1;
      this.projectObj.address_2 = this.customers[index].address_2;
      this.projectObj.city_id = this.customers[index].city_id;
      this.projectObj.city_name = this.customers[index].city_name;
      this.projectObj.state_id = this.customers[index].state_id;
      this.projectObj.zip_code = this.customers[index].zip_code;
      this.projectObj.sub_division_name =
        this.customers[index].sub_division_name;
      this.projectObj.major_intersection =
        this.customers[index].major_intersection;
    }
  }

  onSelectProjectSpecificAddress() {
    this.projectObj.address_1 = undefined;
    this.projectObj.address_2 = undefined;
    this.projectObj.city_id = undefined;
    this.projectObj.state_id = undefined;
    this.projectObj.zip_code = undefined;
    this.projectObj.sub_division_name = undefined;
    this.projectObj.major_intersection = undefined;
    this.projectObj.city_name = undefined;
    this.projectObj.city_id = undefined;
    console.log(this.filteredOptions);
  }

  onChange() {
    if (this.projectObj.is_customer_address == 1) {
      this.onSelectCustomerAddress();
    }
  }

  onTriggerUpload() {
    this.el.nativeElement.querySelector("#file_upload").click();
  }

  onCompressImages(event: any) {
    var totalImages = event.target.files.length;
    this._compressImagesService.uploadFiles(event).then(
      (imgaes: any) => {
        imgaes.subscribe((image: any) => {
          if (this.compresseFiles == undefined) {
            this.compresseFiles = new Array<ProjectAttachments>();
          }

          this.ProjectAttachments = new ProjectAttachments();
          this.ProjectAttachments.original_name =
            image.compressedImage.fileName;
          this.ProjectAttachments.encrypted_name =
            image.compressedImage.imageDataUrl;
          this.compresseFiles.push(this.ProjectAttachments);
        });
        this.uploadFiles();
      },
      (error) => {
        this._sharedService.error("Something went wrong");
      }
    );
    // }0
  }

  onDeleteProjectAttachment() {
    this._adminService
      .deleteAttachment(
        this.deleteAttcahmentID,
        this.deleteAttachmentEncryptedName
      )
      .subscribe(
        (res) => {
          this.activeModelRef.dismiss();
          var index = this.projectObj.attachments.findIndex(
            (item) => item.encrypted_name === this.deleteAttachmentEncryptedName
          );
          this.projectObj.attachments.splice(index, 1);
          this.deleteAttachmentEncryptedName = undefined;
          this.deleteAttcahmentID = undefined;
          this._sharedService.success("Attachment deleted successfully");
        },
        (error) => {
          this.deleteAttachmentEncryptedName = undefined;
          this.deleteAttcahmentID = undefined;
          this.activeModelRef.dismiss();
          this._sharedService.error("Something went wrong");
        }
      );
  }
  openDeleteAttachmentModal(modal: any, id: number, name: string) {
    this.deleteAttcahmentID = id;
    this.deleteAttachmentEncryptedName = name;
    this.activeModelRef = this._modelService.open(modal);
  }

  uploadFiles() {
    this._adminService
      .uploadAttachments(this.compresseFiles, this.projectObj.id)
      .subscribe(
        (res: any) => {
          if (this.projectObj.attachments == undefined) {
            this.projectObj.attachments = new Array<ProjectAttachments>();
          }
          this.compresseFiles = new Array<ProjectAttachments>();
          // this.projectObj.attachments = res.project_attachments;

          res.project_attachments.forEach((element: any) => {
            this.file = new ProjectAttachments();
            this.file.id = element.id;
            this.file.original_name = element.original_name;
            this.file.encrypted_name = element.encrypted_name;
            this.projectObj.attachments.push(this.file);
          });
        },
        (error) => {
          this.compresseFiles = new Array<ProjectAttachments>();
        }
      );
  }
  optionClicked(id: number, customer: any) {
    // this.phoneCallObj=customer;
    debugger;
    let cityId = customer.city_id;
    let cityArray = this.cities.filter((city) => city.id === cityId);

    console.log(cityArray);
    if (id != undefined || id != null) {
      this.projectObj.customer_id = id;
      this.projectObj.address_1 = customer.address_1;
      this.projectObj.address_2 = customer.address_2;
      this.projectObj.city_id = customer.city_id;
      this.projectObj.major_intersection = customer.major_intersection;
      this.projectObj.state_id = customer.state_id;
      this.projectObj.sub_division_name = customer.sub_division_name;
      this.projectObj.zip_code = customer.zip_code;
      if (cityArray != null) {
        this.projectObj.city_name = cityArray[0].name;
      }
    }
  }
  supervisorClicked(id: number) {
    this.projectObj.supervisor_id = id;
  }
  estimatorsClicked(id: number) {
    this.projectObj.estimator_id = id;
  }
  crewClicked(id: number) {
    this.projectObj.crew_id = id;
  }
  cityClicked(city) {
    console.log(city);
    // alert("city id");
    this.projectObj.city_id = city.id;
  }
}

import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/models/project';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedService } from 'src/app/services/shared.service';
import { Customer } from 'src/app/models/customer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerObj: Customer;
  projectObj: Project;

  private projectDetails = [];
  projectId: number;
  activeModelRef: NgbModalRef;
  customerData;
  customerID: number
  customerProjects: Array<Project>;

  constructor(private route: ActivatedRoute, private _customerService: CustomerService, public _sharedService: SharedService, public _modelService: NgbModal, public _adminService: AdminSideService) {
    ;
  }

  ngOnInit() {
    this.customerObj = new Customer();
    this.projectObj = new Project();
    this.customerProjects = new Array<Project>();
    this.route.params.subscribe((params) => {
      this.customerID = +params['id']; // (+) converts string 'id' to a number
      if (this.customerID != undefined && this.customerID != 0 && !isNaN(this.customerID)) {
        this.OnGetCustomer(this.customerID);
      }
      else {
        this.customerID = 0;
      }
    });
    // this.onGetProjects();
  }

  OnGetCustomer(id: number) {
    this._customerService.getCustomer(id).subscribe((response: any) => {
      this.customerObj.id = response.customer[0].id;
      this.customerObj = response.customer[0];
      this.customerProjects = response.projects;
    }, (error) => {
      this._sharedService.error(error);
    })

  }

  openDeleteProjectModal(modal: any, project_id: number) {
    this.projectId = project_id;
    this.activeModelRef = this._modelService.open(modal)
  }

  deleteProject() {
    this._adminService.deleteProject(this.projectId).subscribe((res: any) => {

    })
  }

}

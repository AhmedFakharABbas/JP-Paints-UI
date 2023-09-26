import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCustomerReference } from 'src/app/models/search-customer-reference.model';

@Component({
  selector: 'app-search-reference',
  templateUrl: './search-reference.component.html',
  styleUrls: ['./search-reference.component.css']
})
export class SearchReferenceComponent implements OnInit {

  public customerDetails = [];
  private viewCustomerDetail = [];
  p:number; //for pagination
  customerObj: Customer;
  searchCustomerReferenceObj: SearchCustomerReference;
  activeModelRef: NgbModalRef;
  customerId: number;
  cities: Array<string>;
  statuses: Array<string>;
  states: Array<string>;
  project_types: Array<string>;

  constructor(private router: Router, private route: ActivatedRoute, public _sharedService: SharedService, private _customerService: CustomerService, public _modelService: NgbModal, public _adminService: AdminSideService) {

  }

  ngOnInit() {
    this.customerObj = new Customer();
    this.searchCustomerReferenceObj = new SearchCustomerReference();
    this.customerDetails = new Array<Customer>(); 
    this.OngetCustomers();
    this.onGetProjetsMeta();
  }

  OngetCustomers() {
    this._customerService.getSearchReferenceCustomers().subscribe((res: any) => {
      
      this.customerDetails = res.customers;
      
      // this._sharedService.success('data retrived Success');
    }, (error) => {
      
      this._sharedService.error(error);
    })
    
  }

  onGetProjetsMeta() {
    this._adminService.getProjectMeta().subscribe((res: any) => {
      
      
      this.project_types = res.project_types;
      this.statuses = res.statuses;
      this.cities = res.cities;
      this.states = res.states;
    },
      error => {
        this._sharedService.error(error);
        
      })
  }

  ondeleteCustomers(id: number) {
    // 
    this._customerService.deleteCustomer(id,this.customerObj).subscribe((customerdata: any) => {
      this.customerDetails = customerdata;
      // 
      this._sharedService.success(customerdata.success);
      var index = this.customerDetails.findIndex(item => item.id == id);
      this.customerDetails.splice(index,1);
      this.activeModelRef.close();
      this.p = 1;
    }, (error) => {
      this._sharedService.error(error.error);
    })
  }

  onGetCustomerReferenceSearchFilterMeta() {
    
    this._customerService.getCustomerReferenceSearchFilterMeta(this.searchCustomerReferenceObj).subscribe((res: any) => {
      
      this.customerDetails = res.customers;

      if (res.customers == null || res.customers.length <= 0) {
        this.customerDetails = res.projects;
      }

      // this._sharedService.success('data retrived Success');
    }),
      error => {
        this._sharedService.error(error);
        
      }
  }

  onNavigateCreateCustomer() {
    this.router.navigate(['/customer/create']);
  }


  openCustomerReferenceModel(modal: any, customer_id: number) {
    this.customerId = customer_id;
    this.activeModelRef = this._modelService.open(modal)
  }

}

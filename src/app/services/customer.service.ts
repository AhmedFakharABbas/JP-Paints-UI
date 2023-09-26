import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomHttpService } from './custom-http.service';
import { CustomerPayments } from '../models/customer-payments';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchCustomer } from '../models/search-customer.model';
import { SearchCustomerReference } from '../models/search-customer-reference.model';
import { SearchDeletedCustomer } from '../models/search-deleted-customer.model';
import { SharedService } from './shared.service';
import { CustomerInteractions } from '../models/customer-interactions.model';
import { CustomerInteractionsFilter } from '../models/customer-interactions-filter.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  private baseUrl = environment.API_URL;

  constructor(public _customService: CustomHttpService, private http: HttpClient, public _sharedService: SharedService) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': "Bearer " + ((JSON.parse(localStorage.getItem("token"))) != undefined ? (JSON.parse(localStorage.getItem("token"))) : null)
    })
  };

  createCustomer(customerObj: Customer) {
    var url = "customers/create/" + this._sharedService.userObj.id;
    return this._customService.post(url, customerObj);
  }

  updateCustomer(customerObj: Customer) {
    var url = 'customers/update/' + customerObj.id;
    return this._customService.post(url, customerObj);
  }

  getCustomers() {
    var url = "customers/read"
    return this._customService.get(url);
  }


  getCustomerInteractions(id: number) {
    var url = "customers/interactions/read/" + id;
    return this._customService.get(url);
  }

  getFilteredCustomerInteractions(customerInteractionsFilterObj: CustomerInteractionsFilter) {
    var url = "customers/interactions/filter";
    return this._customService.post(url, customerInteractionsFilterObj);
  }

  createUserNote(customerInteractionsObj: CustomerInteractions) {
    var url = "customers/interactions/create/userNote";
    return this._customService.post(url, customerInteractionsObj);
  }

  getSearchReferenceCustomers() {
    var url = "customers/searchReference/read"
    return this._customService.get(url);
  }


  getCustomer(id: number) {
    var url = 'customers/read/' + id;
    return this._customService.get(url);
  }

  deleteCustomer(id: number, customerObj: Customer) {
    var url = "customers/delete/" + id;
    return this._customService.delete(url, customerObj);
  }

  getSoftDeletedCustomers() {
    var url = "customers/softdeleted/all";
    return this._customService.get(url);
  }

  restoreSoftDeletedCustomer(id: number) {
    var url = "customers/softdeleted/restore/" + id;
    return this._customService.get(url);
  }

  getCustomersMeta() {
    var url = "customers/customersmeta";
    return this._customService.get(url);
  }

  getCustomerSearchFilterMeta(customerSearchObj: SearchCustomer,CurrentPageNo: number) {

    var url = "customers/search/filter/"+CurrentPageNo;
    return this._customService.post(url, customerSearchObj);
  }

  getSoftDeletedCustomerSearchFilterMeta(searchDeletedCustomerObj: SearchDeletedCustomer) {
    var url = "customers/softdeleted/search/filter";
    return this._customService.post(url, searchDeletedCustomerObj);
  }



  getCustomerReferenceSearchFilterMeta(customerReferenceSearchObj: SearchCustomerReference) {
    var url = "customers/reference/search/filter";
    return this._customService.post(url, customerReferenceSearchObj);
  }

  // getCustomerMeta() {
  //   var url = "customers/customermeta";
  //   return this._customService.get(url);
  // }

  setData(data) {
    this.apiData.next(data)
  }



}

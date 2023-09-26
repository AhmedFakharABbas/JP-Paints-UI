import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx'
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class CustomHttpService {
  public baseUrl = environment.API_URL
  // BASE_API_URL;
  public token;

  public pendingRequests: number = 0;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': "Bearer " + ((JSON.parse(localStorage.getItem("token"))) != undefined ? (JSON.parse(localStorage.getItem("token"))) : null)
    })
  };

  constructor(private _http: HttpClient, private _route: Router, public _sharedService: SharedService) { }
  get(url: string, data?: any): Observable<any[]> {
    this.pendingRequests++;
    this._sharedService.loading = true;

    return this._http.get(this.baseUrl + url, this.httpOptions)
      .map((response: any) => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        return response;
      })
      .catch(e => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        // if (e.status === 401) {

        //   this.signout();
        // }
        return Observable.throw(e.error)
      });
  }


  delete(url: string, data?: any): Observable<any[]> {
    this.pendingRequests++;
    this._sharedService.loading = true;

    return this._http.delete(this.baseUrl + url, this.httpOptions)
      .map((response: any) => {
        this.pendingRequests--;
        
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        return response;
      })
      .catch(e => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        // if (e.status === 401) {

        //   this.signout();
        // }
        // return throwError(e.message || e);
        return Observable.throw(e.error);
      });
  }

  getWithoutHeader(url: string, data?: any): Observable<any[]> {
    this.pendingRequests++;
    this._sharedService.loading = true;
    return this._http.get(this.baseUrl + url, this.httpOptions)
      .map((response: any) => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        return response.json();
      })
      .catch(e => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        if (e.status === 401) {

          this.signout();
        }
        return Observable.throw(e.error);
      });
  }

  postWithoutHeader(url: string, data: any): Observable<any[]> {
    this.pendingRequests++;
    this._sharedService.loading = true;
    return this._http.post(this.baseUrl + url, data, this.httpOptions)
      .map((response: any) => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        return response.json();
      })
      .catch(e => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        // if (e.status === 401) {

        //   this.signout();
        // }
        // return Observable.throw(e);
        return Observable.throw(e.error);
      });
  }

  post(url: string, data: any,is_loading: boolean = true): Observable<any[]> {
    this.pendingRequests++;
    this._sharedService.loading = is_loading == true ? true : false;
    return this._http.post(this.baseUrl + url, data, this.httpOptions)
      .map((response: any) => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        return response;
      })
      .catch(e => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        // if (e.status === 401) {

        //   this.signout();
        // }
        return Observable.throw(e.error);
      });
  }

  signin(data: any) {
    
    this.pendingRequests++;
    this._sharedService.loading = true;

    return this._http.post(environment.BASE_API_URL, 
      
      
      { grant_type: environment.grant_type, client_id: environment.client_id, client_secret: environment.client_secret, scope: environment.scope, username: data.userName, password: data.password }, this.httpOptions)

      .map((response: Response) => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        return response;
      })
      .catch(e => {
        this.pendingRequests--;
        if (this.pendingRequests == 0) {
          this._sharedService.loading = false;
        }
        // if (e.status === 401) {

        //   this.signout();
        // }
        return Observable.throw(e.error);
        // return e.error
      });
  }

  signout() {
    localStorage.clear();
    this._sharedService.userObj = undefined;
    this._sharedService.role_flags = undefined;
    this._sharedService.logged_user_roles = undefined;
    this._route.navigate(['/login']);
  }




}

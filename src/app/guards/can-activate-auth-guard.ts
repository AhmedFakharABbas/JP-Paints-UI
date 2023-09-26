import { UserAdministration } from './../models/user-administration.model';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuthGuard implements CanActivate {

  constructor(private router: Router, private _sharedService: SharedService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('userObj') != undefined && localStorage.getItem('userObj') != 'undefined') {
      return true;
    }
    else {
      localStorage.clear();
      this._sharedService.userObj = new UserAdministration();
      this._sharedService.logged_user_roles = undefined;
      this._sharedService.error("Authorization Error!");
      this.router.navigate(['/login']);
      return false;
    }
  }
}

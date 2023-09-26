import { UserAdministration } from 'src/app/models/user-administration.model';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private router: Router, private _sharedService: SharedService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('userObj') != undefined && localStorage.getItem('userObj') != 'undefined') {
      // this._sharedService.userObj = JSON.parse(localStorage.getItem('userObj'));
      // if (this._sharedService.userObj.role_id == 58) {
      //   return true;
      // } else {
      //   this.signOut();
      //   return false;
      // }
      return true;
    }
    else {
      this.signOut();
      return false;
    }
  }

  signOut() {
    localStorage.clear();
    this._sharedService.userObj = new UserAdministration();
    this._sharedService.logged_user_roles = undefined;
    this._sharedService
    this._sharedService.error("Authorization Error!");
    this.router.navigate(['/login']);
  }

}

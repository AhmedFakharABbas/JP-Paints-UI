import { UserAdministration } from 'src/app/models/user-administration.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserLoginDetails } from '../models/user-login-details.model';
import { environment } from 'src/environments/environment';

import {

  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router
} from '@angular/router'
import { UserRoles } from '../models/user-roles.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RoleFlag } from '../models/role-flag';
import { Project } from '../models/project';



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  phoneCallsDetailID : number = 0;
  userObj: UserAdministration;
  userRolesObj: UserRoles
  userRolesArray: Array<UserRoles>;
  public loading: boolean = false;
  public token;
  public user;
  public first_name;
  calendarId: number = 60;
  selectedCrewId: number = -1;
  currentUserFullName: any
  isSidebarShow: boolean = true;
  isDisplayNone: boolean = true;
  countToShowProjects;
  userDetailsArray: Array<UserLoginDetails>;
  projectsArray : Array<Project>;
  logged_user_roles: Array<UserRoles>;

  // limit_access_array_1 :{role_id: number} [] =  [{"role_id":2},{"role_id":3}]
  // admin_access_array :{role_id: number} [] =  [{"role_id":2}]

  role_flags: RoleFlag

  storage_url = environment.BASE_API_STORAGE_URL;

  constructor(public _toastrService: ToastrService) {

    this.role_flags = new RoleFlag();

    if (localStorage.getItem('userObj') != undefined && localStorage.getItem('userObj') != 'undefined') {      
        this.userObj = JSON.parse(localStorage.getItem('userObj'));      
    }    
    if (localStorage.getItem('logged_user_roles') != undefined && localStorage.getItem('logged_user_roles') != 'undefined') {      
      this.logged_user_roles = JSON.parse(localStorage.getItem('logged_user_roles'));      
    }

    if (localStorage.getItem('role_flags') != undefined && localStorage.getItem('role_flags') != 'undefined') {      
      this.role_flags = JSON.parse(localStorage.getItem('role_flags'));      
    }
  }

  // Success Type
  success(message: string) {
    this._toastrService.success(message);
  }

  // Success Type
  typeInfo() {
    this._toastrService.info('We do have the Kapua suite available.', 'Turtle Bay Resort');
  }

  // Warning Type
  warning(message: string) {
    this._toastrService.warning(message);
  }

  // Success Type
  error(message: string) {
    this._toastrService.error(message);
  }

  // Info Type
  info(message: string) {
    this._toastrService.info(message);
  }

  // Custom Type
  typeCustom() {
    this._toastrService.success('<span style="color: red">Message in red.</span>', null, { enableHtml: true });
  }

  // Progress bar
  progressBar() {
    this._toastrService.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { "progressBar": true });
  }

  // Timeout
  timeout() {
    this._toastrService.error('I do not think that word means what you think it means.', 'Timeout!', { "timeOut": 2000 });
  }


  // Dismiss _toastrService on Click
  dismissToastOnClick() {
    this._toastrService.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { "tapToDismiss": true });
  }
  // Remove current toasts using animation
  clearToast() {
    this._toastrService.clear()
  }

  // Show close button
  showCloseButton() {
    this._toastrService.info('Have fun storming the castle!', 'Miracle Max Says', { closeButton: true });
  }
  // Enable  HTML
  enableHtml() {
    this._toastrService.info('<i>Have fun <b>storming</b> the castle!</i>', 'Miracle Max Says', { enableHtml: true });
  }
  // Title Class
  titleClass() {
    this._toastrService.info('Have fun storming the castle!', 'Miracle Max Says', { titleClass: 'h3' });
  }
  // Message Class
  messageClass() {
    this._toastrService.info('Have fun storming the castle!', 'Miracle Max Says', { messageClass: 'text-uppercase' });
  }


}


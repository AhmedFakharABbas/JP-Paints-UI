import { SharedService } from './../../services/shared.service';
import { CustomHttpService } from './../../services/custom-http.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { inject } from '@angular/core/testing';
import { RouterLinkActive, Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-item';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  MenuItems : MenuItem[] = 
  [
    {id:'',path:'/todo/task',title:'Todo',icon:'fas fa-tasks',href:'',data_toggle:'',class:'',SubMenuitems:[]},
    {id:'',path:'/customer/all',title:'Customers',icon:'fas fa-users',href:'',data_toggle:'',class:'',SubMenuitems:[]},
    {id:'',path:'/project/all',title:'Projects',icon:'fas fa-briefcase',href:'',data_toggle:'',class:'',SubMenuitems:[]},
    {id:'',path:'/calendar/crews',title:'Calendars',icon:'fas fa-calendar-alt',href:'',data_toggle:'',class:'',SubMenuitems:[]},
    
    {id:'callsSubmenu',path:'/calls',title:'Calls',icon:'fas fa-phone-volume',href:"#callsSubmenu",data_toggle:'collapse',
    class:'dropdown-toggle active',SubMenuitems:[{id:'',href:'',data_toggle:'',class:'',path:'/calls/search',title:'Search Phone Calls',icon:'fas fa-search',SubMenuitems:[]}]}
  
  ]

  constructor(private router: Router, private _customService: CustomHttpService, public _sharedService: SharedService) { }

  ngOnInit() {

  }

  onSignOut() {
    this._customService.signout();
  }

  onClickCalls(){
   this.router.navigate(['/calls']);
  }

  onNavigateToAllCustomers(){
    this.router.navigate(['/customer/all']);
  }

  onNavigateToScheduledCall(){
   this.router.navigate(['/calls']);
  }

  


}

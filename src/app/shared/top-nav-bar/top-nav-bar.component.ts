import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CustomerService } from 'src/app/services/customer.service';
import { SharedService } from 'src/app/services/shared.service';
import { CustomHttpService } from 'src/app/services/custom-http.service';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit {

  constructor(private _customService: CustomHttpService, public _sharedService:SharedService) { }

  ngOnInit() {
  }

  onCall(){
    
    // $(document).ready(function () {
    //   $('#sidebarCollapse').on('click', function () {
    //     $('#sidebar').toggleClass('active');
    //   });
    // });
  
   
  }

  onSignOut() {
    this._customService.signout();
  }
}

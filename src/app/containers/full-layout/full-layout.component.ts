import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {

  constructor(public _sharedService:SharedService) {
    // $(document).ready(function () {
    //   $('#sidebarCollapse').on('click', function () {
    //     $('#sidebar').toggleClass('active');
    //   });
    // });
  }

  ngOnInit() {

  }

}

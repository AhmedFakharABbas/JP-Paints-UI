import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AdminSideService } from 'src/app/services/admin-side.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.css']
})
export class ViewExpensesComponent implements OnInit {

  pexpenseID:number
  projectID: number;
  customerDetails: any;
  expenseDetails: any;
  expenseItemsDetail: any;

  constructor(public router: Router, public _sharedService: SharedService, private _adminService: AdminSideService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectID = +params['id']; // (+) converts string 'id' to a number
      if (this.projectID != undefined && this.projectID != 0 && !isNaN(this.projectID)) {
        this.onGetAllExpenseItemsMeta(this.projectID);
        this._sharedService.loading == false;
        // this.onGetEstimate(this.projectID);
      }
      else {
        this.projectID = 0;
      }
    });
    this.customerDetails = new Array<any>();
    this.expenseDetails = new Array<any>();
    this.expenseItemsDetail = new Array<any>();
  }

  onGetAllExpenseItemsMeta(id: number) {
    // this.projectExpenseItemsObj.expense_id = this.projectExpensesObj.id;
    this._adminService.getExpenseItemsPaintOrderMeta(id).subscribe((res: any) => {
      this.expenseDetails = res.expense_details;
      this.expenseItemsDetail = res.expense_items;
      // this.pexpenseID = res.expense_items[0].expense_id;
      this.pexpenseID = this.projectID;

    },
      (error) => {
        this._sharedService.error(error.message);
    })
  }


  // onNavigateToEditExpenseDetails() {
  //   this.router.navigate(['/project/view/,expenseDetails.project_number']);
  // }



}

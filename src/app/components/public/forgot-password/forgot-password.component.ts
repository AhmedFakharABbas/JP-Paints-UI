import { Component, OnInit } from '@angular/core';
import { ForgotPassword } from 'src/app/models/forgot-password.model';
import { GeneralService } from 'src/app/services/general.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordObj: ForgotPassword

  constructor(private _generalService: GeneralService, public _sharedService: SharedService) { }

  ngOnInit() {
    this.forgotPasswordObj = new ForgotPassword();
  }

  OnSubmitEmail() {
    this._generalService.sendPasswordResetLink(this.forgotPasswordObj).subscribe((res: any) => {
      this._sharedService.success("Email Send Successfully");
    }, (err: any) => {
      this._sharedService.error("An Error Occurred");
    })
  }
}

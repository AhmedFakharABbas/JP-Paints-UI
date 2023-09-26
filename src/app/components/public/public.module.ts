import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  imports: [
    PublicRoutingModule,
    SharedModule,
    CommonModule
  ],
  declarations: [LoginComponent, ForgotPasswordComponent]
})
export class PublicModule { }

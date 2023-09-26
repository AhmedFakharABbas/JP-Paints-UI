import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ManageUserAccessComponent } from './manage-user-access/manage-user-access.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginUserComponent } from './login-user/login-user.component';



@NgModule({
  declarations: [CreateUserComponent, AllUsersComponent, ManageUserAccessComponent, LoginUserComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
  ]
})
export class UserModule { }

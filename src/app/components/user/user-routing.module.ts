import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ManageUserAccessComponent } from './manage-user-access/manage-user-access.component';
import { LoginUserComponent } from './login-user/login-user.component';

const routes: Routes = [

  { path: 'view/:id', component: LoginUserComponent },
  { path: 'update/:id', component: CreateUserComponent },
  { path: 'create', component: CreateUserComponent },

  {
    path: 'all',
    component: AllUsersComponent
  },

  {
    path: 'manage-access',
    component: ManageUserAccessComponent
  },
  {
    path: 'login-user',
    component: LoginUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

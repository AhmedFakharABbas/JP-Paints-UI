import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstimatorsComponent } from './estimators/estimators.component';
import { CrewsComponent } from './crews/crews.component';
import { SubcontractorsComponent } from './subcontractors/subcontractors.component';
import { OfficeComponent } from './office/office.component';

const routes: Routes = [

  {
    path: 'crews',
    component: CrewsComponent
  },

  { path: 'schedule/estimate/:id', component: CrewsComponent},
  { path: 'schedule/crew/:id', component: CrewsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendersRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkorderExteriorComponent } from './workorder-exterior/workorder-exterior.component';
import { WorkorderInteriorComponent } from './workorder-interior/workorder-interior.component';
import { WorkorderOtherComponent } from './workorder-other/workorder-other.component';

const routes: Routes = [
  { path: 'exterior/pdf/:id', component: WorkorderExteriorComponent },
  { path: 'interior/pdf/:id', component: WorkorderInteriorComponent },
  { path: 'other/pdf/:id', component: WorkorderOtherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkorderPdfRoutingModule { }

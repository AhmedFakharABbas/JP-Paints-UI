import { InteriorPdfComponent } from './interior-pdf/interior-pdf.component';
import { OtherPdfComponent } from './other-pdf/other-pdf.component';
import { EstimatePdfComponent } from './estimate-pdf/estimate-pdf.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { AddEditProjectComponent } from './add-edit-project/add-edit-project.component';
import { ViewExpensesComponent } from './view-projects/view-expenses/view-expenses.component';



const routes: Routes = [
  {
    path: 'all',
    component: ProjectsComponent
  },



  { path: 'view/:id', component: ViewProjectsComponent },

  { path: 'update/:id', component: AddEditProjectComponent },

  { path: 'create', component: AddEditProjectComponent },

  {
    path: 'expense/view/:id', component: ViewExpensesComponent,
    children: [
      { path: '**', component: ViewExpensesComponent },
    ]
  },



  { path: 'exterior/pdf/:id', component: EstimatePdfComponent },
  { path: 'interior/pdf/:id', component: InteriorPdfComponent },
  { path: 'other/pdf/:id', component: OtherPdfComponent },

  {
    path: 'workorder',
    component: WorkOrderComponent
  },

  // {
  //   path: 'add-edit',
  //   component: AddEditProjectComponent
  // },

  {
    path: 'view-expenses',
    component: ViewExpensesComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }

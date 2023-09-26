import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InformationExteriorComponent } from './information-exterior/information-exterior.component';
import { InformationInteriorComponent } from './information-interior/information-interior.component';
import { InformationOtherComponent } from './information-other/information-other.component';


const routes: Routes = [
  { path: 'exterior/pdf/:id', component: InformationExteriorComponent },
  { path: 'interior/pdf/:id', component: InformationInteriorComponent },
  { path: 'other/pdf/:id', component: InformationOtherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationPdfRoutingModule { }

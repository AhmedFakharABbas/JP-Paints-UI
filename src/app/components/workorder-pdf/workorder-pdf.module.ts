import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkorderPdfRoutingModule } from './workorder-pdf-routing.module';
import { WorkorderExteriorComponent } from './workorder-exterior/workorder-exterior.component';
import { WorkorderInteriorComponent } from './workorder-interior/workorder-interior.component';
import { WorkorderOtherComponent } from './workorder-other/workorder-other.component';


@NgModule({
  declarations: [WorkorderExteriorComponent, WorkorderInteriorComponent, WorkorderOtherComponent],
  imports: [
    CommonModule,
    WorkorderPdfRoutingModule,
    SharedModule
  ]
})
export class WorkorderPdfModule { }

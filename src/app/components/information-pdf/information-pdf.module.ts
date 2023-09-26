import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationPdfRoutingModule } from './information-pdf-routing.module';
import { InformationExteriorComponent } from './information-exterior/information-exterior.component';
import { InformationInteriorComponent } from './information-interior/information-interior.component';
import { InformationOtherComponent } from './information-other/information-other.component';


@NgModule({
  declarations: [InformationExteriorComponent, InformationInteriorComponent, InformationOtherComponent],
  imports: [
    CommonModule,
    InformationPdfRoutingModule,
    SharedModule
  ]
})
export class InformationPdfModule { }

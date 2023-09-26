import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ScrollingModule } from "@angular/cdk/scrolling";

import { ProjectsRoutingModule } from "./projects-routing.module";
import { ViewProjectsComponent } from "./view-projects/view-projects.component";
import { ProjectsComponent } from "./projects.component";
import { WorkOrderComponent } from "./work-order/work-order.component";
import { AddEditProjectComponent } from "./add-edit-project/add-edit-project.component";
import { DatePickerComponent } from "../date-picker/date-picker.component";
import { TimesPipe } from "src/app/pipes/times.pipe";
import { ViewExpensesComponent } from "./view-projects/view-expenses/view-expenses.component";
import { EstimatePdfComponent } from "./estimate-pdf/estimate-pdf.component";
import { InteriorPdfComponent } from "./interior-pdf/interior-pdf.component";
import { OtherPdfComponent } from "./other-pdf/other-pdf.component";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ScrollingModule,
    VirtualScrollerModule,
    MatProgressSpinnerModule,
  ],

  exports: [DatePickerComponent],
  declarations: [
    ViewProjectsComponent,
    ProjectsComponent,
    WorkOrderComponent,
    AddEditProjectComponent,
    DatePickerComponent,
    ViewExpensesComponent,
    EstimatePdfComponent,
    InteriorPdfComponent,
    OtherPdfComponent,
  ],
  providers: [],
  bootstrap: [],
})
export class ProjectsModule {}

import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CalendersRoutingModule } from "./calenders-routing.module";
import { EstimatorsComponent } from "./estimators/estimators.component";
import { CrewsComponent } from "./crews/crews.component";
import { SubcontractorsComponent } from "./subcontractors/subcontractors.component";
import { OfficeComponent } from "./office/office.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    EstimatorsComponent,
    CrewsComponent,
    SubcontractorsComponent,
    OfficeComponent,
  ],
  imports: [
    CommonModule,
    CalendersRoutingModule,
    SharedModule,
    ScrollingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatProgressSpinnerModule,
  ],
  providers: [DatePipe],
})
export class CalendersModule {}

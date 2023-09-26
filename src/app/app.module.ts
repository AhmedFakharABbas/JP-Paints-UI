import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLayoutComponent } from './containers/full-layout/full-layout.component';
import { SimpleLayoutComponent } from './containers/simple-layout/simple-layout.component';
import { LoaderComponent } from './loader/loader.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GeneralService } from './services/general.service';
import { AdminSideService } from './services/admin-side.service';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from '@angular/material/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgSelectModule } from '@ng-select/ng-select';
import { BnNgIdleService } from 'bn-ng-idle';
import { DayViewSchedulerService } from './services/day-view-scheduler.service';




@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    LoaderComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    FormsModule,
    SharedModule,
    NgbDatepickerModule,
    NgSelectModule,
    NgbModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],

  providers: [GeneralService, AdminSideService, NgbDatepickerModule,BnNgIdleService , DayViewSchedulerService],
  bootstrap: [AppComponent],
  exports: []

})
export class AppModule { }

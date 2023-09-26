import { TimesPipe } from 'src/app/pipes/times.pipe';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { SearchfilterPipe } from '../pipes/searchfilter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { NgbTooltipModule, NgbModule, NgbDropdownModule, NgbDatepickerModule, NgbTimepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { IdFilterPipe } from '../pipes/id-filter.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatCheckboxModule, MatAutocompleteModule, MatStepperModule } from '@angular/material';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { ToastrModule } from 'ngx-toastr';
import { ArrayFilterPipe } from '../pipes/array-filter.pipe';
import { UserpipesPipe } from '../pipes/userpipes.pipe';
import { CustomerPipe } from '../pipes/customer.pipe';
import {CustomFilterPipe} from '../pipes/custom-filter.pipe'





@NgModule({
  declarations: [HeaderComponent, 
    UserpipesPipe,
    CustomerPipe,
    TimesPipe, 
    SidenavComponent, 
    FooterComponent, FilterPipe, 
    IdFilterPipe, 
    TopNavBarComponent, 
    SearchfilterPipe,
    ArrayFilterPipe,
    CustomFilterPipe],
  imports: [
    RouterModule,
    NgxPaginationModule,
    NgbTooltipModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    NgbDropdownModule,
    NgxPaginationModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    NgbTimepickerModule,
    MatAutocompleteModule,
    NgxTypeaheadModule,
    MatStepperModule,
    NgbModalModule,
    ToastrModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    IdFilterPipe,
    UserpipesPipe,
    CustomerPipe,
    FilterPipe,
    RouterModule,
    NgxPaginationModule,
    TopNavBarComponent,
    FooterComponent,
    SearchfilterPipe,
    NgbTooltipModule,
    TimesPipe,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    MatCheckboxModule,
    NgbTimepickerModule,
    MatAutocompleteModule,
    NgxTypeaheadModule,
    MatStepperModule,
    NgbModalModule,
    ToastrModule,
    ArrayFilterPipe,
    CustomFilterPipe,

  ],
  providers: [],

})


export class SharedModule {



}

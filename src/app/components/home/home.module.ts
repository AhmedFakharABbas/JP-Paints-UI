import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

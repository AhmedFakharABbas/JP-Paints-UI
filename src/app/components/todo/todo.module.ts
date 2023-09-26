import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoComponent } from './todo.component';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule
  ],
  declarations: [TodoComponent],
  providers: []
})
export class TodoModule { }

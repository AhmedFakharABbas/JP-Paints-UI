import { Task } from "./../../models/task";
import { GeneralService } from "./../../services/general.service";
import { SharedService } from "./../../services/shared.service";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import * as $ from "jquery";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  activatedModalRef: NgbModalRef;
  taskObj: Task;
  taskId: number;
  task_types: Array<Object>;
  todo_tasks: Array<Task>;
  companyTodoCurrentPageNo: number;
  personalTodoCurrentPageNo: number;
  company_todo_count: number;
  personal_todo_count: number;

  constructor(
    private _modalService: NgbModal,
    public _generalService: GeneralService,
    public _sharedService: SharedService
  ) {
    this.taskObj = new Task();
    this.task_types = new Array<Object>();
    this.todo_tasks = new Array<Task>();
  }

  ngOnInit() {
    this.companyTodoCurrentPageNo = 1;
    this.personalTodoCurrentPageNo = 1;
    this.onGetTasks();
  }

  onCreateTask() {
    this.taskObj.user_id = this._sharedService.userObj.id;
    this._generalService.createTask(this.taskObj).subscribe(
      (res: any) => {
        this.taskObj.id = res.id;
        // this.todo_tasks.push(this.taskObj);
        this.taskObj.task_type_id == 87
          ? (this.company_todo_count = this.company_todo_count + 1)
          : (this.personal_todo_count = this.personal_todo_count + 1);

        this.activatedModalRef.dismiss("dismiss");
        this._sharedService.success(res.success);
      },
      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  onCompleteTask(id: number) {
    this.taskId = id;
    this.taskObj.id = this.taskId;
    this.taskObj.is_completed = true;

    this._generalService.completeTask(this.taskObj).subscribe(
      (res: any) => {
        this._sharedService.success(res.success);
        var index = this.todo_tasks.findIndex((item) => item.id == this.taskId);
        this.todo_tasks.splice(index, 1);
      },
      (error) => {}
    );
  }

  onGetTasks() {
    this._generalService
      .getTasks(
        this._sharedService.userObj.id,
        this.companyTodoCurrentPageNo,
        this.personalTodoCurrentPageNo
      )
      .subscribe(
        (res: any) => {
          this.task_types = res.task_types;
          this.todo_tasks = res.todo_tasks;
          this.company_todo_count = res.company_todo_count;
          this.personal_todo_count = res.personal_todo_count;
        },
        (error) => {
          this._sharedService.error(error);
        }
      );
  }

  deleteTodoTask() {
    this.activatedModalRef.close();

    this._generalService.deleteTodoTask(this.taskId).subscribe(
      (res: any) => {
        var index = this.todo_tasks.findIndex((item) => item.id == this.taskId);

        this.todo_tasks.splice(index, 1);
        this._sharedService.success(res.success);
      },

      (error) => {
        this._sharedService.error(error);
      }
    );
  }

  openDeleteTaskModal(modal: any, task_id: number) {
    this.taskId = task_id;
    this.activatedModalRef = this._modalService.open(modal, { size: "lg" });
  }

  openTodoModal(modal: any) {
    this.taskObj = new Task();
    this.activatedModalRef = this._modalService.open(modal, { size: "lg" });
  }
}

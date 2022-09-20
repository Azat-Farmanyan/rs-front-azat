import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { BoardsService } from 'src/app/services/boards.service';
import { ColumnsService } from 'src/app/services/columns.service';
import { StorageService } from 'src/app/services/storage.service';
import { TasksService } from 'src/app/services/tasks.service';
import { IColumn } from 'src/app/shared/interfaces/IColumn';
import { ITask } from 'src/app/shared/interfaces/ITask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() column: IColumn;
  @Input() currentBoardId: string;
  // @Input() tasks: ITask[];

  tasks: ITask[] = [];

  options = false;
  showAddTask = false;
  showDeleteColumnModal = false;

  constructor(
    public authService: AuthService,
    private columnsService: ColumnsService,
    public tasksService: TasksService,
    private storageService: StorageService,
    private boardService: BoardsService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getTasks();
  }

  showAddTaskModal() {
    this.showAddTask = true;
  }
  closeAddTaskModal(closeAddTAskModal: boolean) {
    this.showAddTask = closeAddTAskModal;
  }
  deleteColumn() {
    this.showDeleteColumnModal = true;
  }
  cancel(cancel: boolean) {
    this.showDeleteColumnModal = cancel;
    this.options = cancel;
  }
  getTasks() {
    this.tasksService
      .getTasks(this.currentBoardId, this.column._id)
      .subscribe((res) => {
        this.tasks = res;
      });
  }
  deleteTask(deletedTaskId: string) {
    this.tasks.filter((task) => task._id !== deletedTaskId);
    this.toastr.success(
      `deleted successfully `,
      `Task: ${this.tasks.find((el) => el._id === deletedTaskId)?.title}`
    );
    this.getTasks();
  }
  addNewtask(newTask: ITask) {
    this.tasks.push(newTask);
    this.toastr.success(`created successfully `, `Task: ${newTask.title}`);
    setTimeout(() => {
      this.getTasks();
    }, 1000);
  }
}

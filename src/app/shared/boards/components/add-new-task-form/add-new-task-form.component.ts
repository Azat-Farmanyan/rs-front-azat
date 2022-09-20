import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { TasksService } from 'src/app/services/tasks.service';
import { ITask } from 'src/app/shared/interfaces/ITask';

@Component({
  selector: 'app-add-new-task-form',
  templateUrl: './add-new-task-form.component.html',
  styleUrls: ['./add-new-task-form.component.scss'],
})
export class AddNewTaskFormComponent implements OnInit {
  newTaskForm: FormGroup;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  @Output() onCreate = new EventEmitter();

  @Input() currentBoardId: string;
  @Input() currentColumnId: string;

  constructor(
    private tasksService: TasksService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  createNewTask() {
    const newTask: ITask = { ...this.newTaskForm.value };
    this.tasksService
      .createTask(newTask, this.currentBoardId, this.currentColumnId)
      .subscribe(() => {});
    this.onCreate.emit(newTask);
    this.newTaskForm.reset();
    this.onSubmit.emit(false);
  }
  cancel() {
    this.onCancel.emit(false);
  }
}

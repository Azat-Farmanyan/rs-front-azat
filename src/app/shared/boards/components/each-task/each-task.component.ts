import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { IColumn } from 'src/app/shared/interfaces/IColumn';
import { ITask } from 'src/app/shared/interfaces/ITask';

@Component({
  selector: 'app-each-task',
  templateUrl: './each-task.component.html',
  styleUrls: ['./each-task.component.scss'],
})
export class EachTaskComponent implements OnInit {
  @Input() currentBoardId: string;
  @Input() columnId: string;
  @Input() task: ITask;

  @Output() onDelete = new EventEmitter();

  // this.route.params.subscribe((params: Params) => {
  //   this.currentBoardId = params.id;})

  constructor(public tasksService: TasksService, public route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.currentBoardId = params.id;
    });
  }

  ngOnInit(): void {}
  deleteTask() {
    this.tasksService
      .deleteTask(this.task._id, this.currentBoardId, this.columnId)
      .subscribe(() => {
        this.onDelete.emit(this.task._id);
      });
  }
}

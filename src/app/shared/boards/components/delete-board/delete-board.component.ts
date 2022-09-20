import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BoardsService } from 'src/app/services/boards.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-delete-board',
  templateUrl: './delete-board.component.html',
  styleUrls: ['./delete-board.component.scss'],
})
export class DeleteBoardComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Input() currentBoardID = '';
  constructor(
    private boardsService: BoardsService,
    private toastr: ToastrService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {}
  cancelDelete() {
    this.onCancel.emit(true);
    console.log(this.currentBoardID);
  }
  deleteBoard() {
    this.tasksService.tasks = this.tasksService.tasks.filter(
      (el) => el.boardId !== this.currentBoardID
    );
    this.boardsService.deleteBoard(this.currentBoardID).subscribe((res) => {
      this.toastr.success('Board deleted successfully');
      this.boardsService.getBoards();
    });
  }
}

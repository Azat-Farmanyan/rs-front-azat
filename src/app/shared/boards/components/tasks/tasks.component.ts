import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BoardsService } from 'src/app/services/boards.service';
import { ColumnsService } from 'src/app/services/columns.service';
import { StorageService } from 'src/app/services/storage.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Iboard } from 'src/app/shared/interfaces/Iboard';
import { ITask } from 'src/app/shared/interfaces/ITask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  currentBoardId: string;
  currentBoardTitle?: string;
  currentBoardDescription: string | undefined;
  // tasks: ITask[] = this.tasksService.tasks.filter;

  showAddNewColumnModal = false;
  searchWord = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public boardsService: BoardsService,
    public StorageService: StorageService,
    private columnsService: ColumnsService,
    public tasksService: TasksService
  ) {}
  ngOnDestroy(): void {
    this.columnsService.columns = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentBoardId = params.id;
      this.boardsService.getBoard(params.id).subscribe((board) => {
        this.currentBoardTitle = (board as Iboard).title;
      });
      this.columnsService.getColumns(this.currentBoardId);
    });
  }
  get isAuthenticated() {
    return !!this.StorageService.getUserData()?.token;
  }
  get columns() {
    return this.columnsService.columns;
  }

  showAddColumnModal() {
    this.showAddNewColumnModal = true;
  }
  closeAddNewColumnModal(close: boolean) {
    this.showAddNewColumnModal = close;
  }
  clearInput() {
    this.searchWord = '';
  }
}

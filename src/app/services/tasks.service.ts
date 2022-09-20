import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { userKey } from '../core/constants/authconstants';
import { ITask } from '../shared/interfaces/ITask';
import { baseUrl } from './boards.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private toastr: ToastrService
  ) {}
  tasks: ITask[] = [];
  // currentBoardId = '';
  // currentColumnId = '';

  deleteTask(taskId: string, currentBoardId: string, currentColumnId: string) {
    return this.http.delete<ITask>(
      `${baseUrl}boards/${currentBoardId}/columns/${currentColumnId}/tasks/${taskId}`
    );
  }
  getTasks(currentBoardId: string, currentColumnId: string) {
    return this.http.get<ITask[]>(
      `${baseUrl}boards/${currentBoardId}/columns/${currentColumnId}/tasks`
    );
  }
  createTask(newTask: ITask, currentBoardId: string, currentColumnId: string) {
    const user = JSON.parse(localStorage.getItem(userKey) as string);
    return this.http.post<ITask>(
      `${baseUrl}boards/${currentBoardId}/columns/${currentColumnId}/tasks`,
      {
        title: newTask.title,
        order: '1',
        description: ' ',
        // userId: user ? user.id : '',
        userId: 1,
        users: [],
        // boardId: currentBoardId,
        // columnId: currentColumnId,
      }
    );
  }
}

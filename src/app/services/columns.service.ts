import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userKey } from '../core/constants/authconstants';
import { IColumn } from '../shared/interfaces/IColumn';
import { baseUrl } from './boards.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  columns: IColumn[] = [];
  boardId = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: ActivatedRoute
  ) {}

  deleteColumn(columnId: string, currentBoardId: string) {
    this.http
      .delete(`${baseUrl}boards/${currentBoardId}/columns/${columnId}`)
      .subscribe((res) => {
        this.columns.filter((el) => el !== res);
        this.getColumns(currentBoardId);
      });
  }

  getColumns(currentBoardId: string) {
    this.loading = true;
    this.http
      .get<IColumn[]>(`${baseUrl}boards/${currentBoardId}/columns`)
      .subscribe((data) => {
        this.columns = data;
        this.boardId = this.storageService.getUserData().id;
        this.loading = false;
        // this.columns = data.filter((currentColumn) => {
        //   return currentColumn.userId === this.storageService.getUserData().id;
        // });
      });
  }
  createColumn(newColumn: IColumn, currentBoardId: string) {
    const user = JSON.parse(localStorage.getItem(userKey) as string);
    this.http
      .post(`${baseUrl}boards/${currentBoardId}/columns`, {
        title: newColumn.title,
        order: 1,
      })
      .subscribe((data: any) => {
        this.columns.push(data);
      });
  }
}

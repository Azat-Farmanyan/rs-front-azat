import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userKey } from '../core/constants/authconstants';
import { Iboard } from '../shared/interfaces/Iboard';
import { StorageService } from './storage.service';
export const baseUrl = 'https://rs-backend-azat.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards: Iboard[] = [];
  loading = false;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  deleteBoard(boardId: string) {
    return this.http.delete(`${baseUrl}boards/${boardId}`);
  }
  getBoard(boardId: string) {
    return this.http.get(`${baseUrl}boards/${boardId}`);
  }

  getBoards() {
    this.loading = true;

    this.http.get<Iboard[]>(`${baseUrl}boards`).subscribe((data) => {
      // this.boards = data.filter((currentBoard) => {
      this.loading = false;
      this.boards = data;
      // return currentBoard.owner === this.storageService.getUserData().id;
      // });
    });
  }
  createBoard(newBoard: Iboard) {
    const user = JSON.parse(localStorage.getItem(userKey) as string);
    this.http
      .post(`${baseUrl}boards`, {
        title: newBoard.title,
        owner: user ? user.id : '',
        users: [],
      })
      .subscribe((data: any) => {
        this.boards.push(data);
      });
  }

  getBoardTitleById(id: string) {
    // console.log(this.boards);
    return this.boards.find((el) => el._id === id);
  }
}

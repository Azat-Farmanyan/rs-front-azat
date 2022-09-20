import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BoardsService } from 'src/app/services/boards.service';
import { StorageService } from 'src/app/services/storage.service';
import { Iboard } from 'src/app/shared/interfaces/Iboard';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  createNewBoardModal = false;
  searchWord = '';
  constructor(
    public router: Router,
    public authService: AuthService,
    private StorageService: StorageService,
    public boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoards();
  }
  get boards() {
    return this.boardsService.boards;
  }
  get isAuthenticated() {
    return !!this.StorageService.getUserData()?.token;
  }
  closeCreateNewBoardModal(closeCreateBoardModal: boolean) {
    this.createNewBoardModal = !closeCreateBoardModal;
  }
  clearInput() {
    this.searchWord = '';
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/services/boards.service';
import { StorageService } from 'src/app/services/storage.service';
import { Iboard } from 'src/app/shared/interfaces/Iboard';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  deleteBoardModal = false;
  @Input() board: Iboard;

  constructor(
    public boardsService: BoardsService,
    public storageService: StorageService
  ) {}

  ngOnInit(): void {}

  cancelDelete(canceled: boolean) {
    this.deleteBoardModal = !canceled;
  }
}

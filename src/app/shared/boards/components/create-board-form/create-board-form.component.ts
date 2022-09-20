import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BoardsService } from 'src/app/services/boards.service';
import { Iboard } from 'src/app/shared/interfaces/Iboard';

@Component({
  selector: 'app-create-board-form',
  templateUrl: './create-board-form.component.html',
  styleUrls: ['./create-board-form.component.scss'],
})
export class CreateBoardFormComponent implements OnInit {
  newBoardForm: FormGroup;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  constructor(
    private boardsService: BoardsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    });
  }
  cancel() {
    this.onCancel.emit(true);
  }
  createNewBoard() {
    const newBoard: Iboard = { ...this.newBoardForm.value };
    this.boardsService.createBoard(newBoard);
    this.newBoardForm.reset();
    this.onSubmit.emit(true);
    this.toastr.success('New board created successfully');
  }
}

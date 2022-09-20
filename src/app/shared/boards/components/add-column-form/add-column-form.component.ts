import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColumnsService } from 'src/app/services/columns.service';
import { IColumn } from 'src/app/shared/interfaces/IColumn';

@Component({
  selector: 'app-add-column-form',
  templateUrl: './add-column-form.component.html',
  styleUrls: ['./add-column-form.component.scss'],
})
export class AddColumnFormComponent implements OnInit {
  newColumnForm: FormGroup;
  @Output() onCancel = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  @Input() currentBoardId: string;

  constructor(
    private columnsService: ColumnsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.newColumnForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  createNewTask() {
    const newColumn: IColumn = { ...this.newColumnForm.value };
    this.columnsService.createColumn(newColumn, this.currentBoardId);
    this.newColumnForm.reset();
    this.onSubmit.emit(false);
    this.toastr.success('New Column created successfully');
  }
  cancel() {
    this.onCancel.emit(false);
  }
}

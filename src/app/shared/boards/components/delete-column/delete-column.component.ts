import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ColumnsService } from 'src/app/services/columns.service';

@Component({
  selector: 'app-delete-column',
  templateUrl: './delete-column.component.html',
  styleUrls: ['./delete-column.component.scss'],
})
export class DeleteColumnComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Input() currentBoardID = '';
  @Input() currentColumnID = '';

  constructor(
    private columnService: ColumnsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  cancelDelete() {
    this.onCancel.emit(false);
  }
  deleteColumn() {
    this.columnService.deleteColumn(this.currentColumnID, this.currentBoardID);
    this.toastr.success('Column deleted successfully');
  }
}

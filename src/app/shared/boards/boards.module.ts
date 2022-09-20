import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { BoardsComponent } from './components/boards/boards.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SharedModule } from '../shared.module';
import { MaxwidthPipe } from '../pipes/maxwidth.pipe';
import { DeleteBoardComponent } from './components/delete-board/delete-board.component';
import { CreateBoardFormComponent } from './components/create-board-form/create-board-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewTaskFormComponent } from './components/add-new-task-form/add-new-task-form.component';
import { AddColumnFormComponent } from './components/add-column-form/add-column-form.component';
import { EachTaskComponent } from './components/each-task/each-task.component';
import { DeleteColumnComponent } from './components/delete-column/delete-column.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { httpTranslateLoader } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    BoardComponent,
    BoardsComponent,
    TaskComponent,
    TasksComponent,
    MaxwidthPipe,
    DeleteBoardComponent,
    CreateBoardFormComponent,
    AddNewTaskFormComponent,
    AddColumnFormComponent,
    EachTaskComponent,
    DeleteColumnComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [BoardComponent, BoardsComponent, TaskComponent, TasksComponent],
})
export class BoardsModule {}

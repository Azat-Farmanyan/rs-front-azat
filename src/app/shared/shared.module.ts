import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './auth/component/signin/signin.component';
import { SignupComponent } from './auth/component/signup/signup.component';
import { BoardsComponent } from './boards/components/boards/boards.component';
import { TasksComponent } from './boards/components/tasks/tasks.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { StorageService } from '../services/storage.service';
import { AuthGuard } from '../core/guards/auth.guard';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { httpTranslateLoader } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard] },
      {
        path: 'boards/:id',
        component: TasksComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'error',
        component: ErrorPageComponent,
      },
      { path: '**', redirectTo: '/error' },
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [StorageService],
  exports: [HeaderComponent, FooterComponent, RouterModule, FilterPipe],
})
export class SharedModule {}

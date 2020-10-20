import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { FeedComponent } from './feed/feed.component';
import { ArticleDetailsComponent } from './feed/article-details/article-details.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserResolver } from './shared/services/user-resolver.service';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: '/explore', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'explore', component: FeedComponent},
  { path: 'article', component: ArticleDetailsComponent},
  { path: 'article/:articleId', component: ArticleDetailsComponent},
  { path: 'account', component: AccountComponent,
    canActivate: [AuthGuard],
    resolve: { user: UserResolver },
  },
  { path: 'notifications', component: NotificationsComponent,
    canActivate: [AuthGuard],
    resolve: { user: UserResolver },
  },

  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

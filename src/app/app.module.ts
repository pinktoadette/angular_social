import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { WebReqInterceptor } from './shared/services/web-req.interceptor';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { FeedModule } from './feed/feed.module';
import { SharedModule } from './shared/shared.module';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserResolver } from './shared/services/user-resolver.service';
import { NotificationsComponent } from './notifications/notifications.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileModule } from './profile/profile.module';
import { UnauthorisedRequestInterceptor } from './shared/guards/auth-intercept.service';


@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginPageComponent,
    SignupPageComponent,
    EditListComponent,
    EditTaskComponent,
    AccountComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FeedModule,
    SharedModule,
    ProfileModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[],
  providers: [
    AuthGuard,
    UserResolver,
    { provide: HTTP_INTERCEPTORS, 
      useClass: WebReqInterceptor, 
      multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorisedRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

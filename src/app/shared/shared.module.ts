import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollFormComponent } from './components/poll-form/poll-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NavPollComponent } from './components/nav-poll/nav-poll.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatCheckboxModule} from '@angular/material/checkbox';
import { LinkPreviewComponent } from './components/link-preview/link-preview.component';
import { CommentComponent } from './components/comment/comment.component';
import { ReplyComponent } from './components/reply/reply.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MentionModule } from 'angular-mentions';
import { CommentResponseComponent } from './components/comment-response/comment-response.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PollFormComponent,
    NavPollComponent,
    LinkPreviewComponent,
    CommentComponent,
    ReplyComponent,
    LoadingComponent,
    CommentResponseComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCheckboxModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MentionModule
  ],
  exports:[
    PollFormComponent,
    NavbarComponent,
    NavPollComponent,
    LinkPreviewComponent,
    ReplyComponent,
    LoadingComponent
  ],
})
export class SharedModule { }

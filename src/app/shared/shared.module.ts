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
import { MatCheckboxModule} from '@angular/material/checkbox';
import { LinkPreviewComponent } from './components/link-preview/link-preview.component';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PollFormComponent,
    NavPollComponent,
    LinkPreviewComponent,
    CommentComponent,
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
    BrowserAnimationsModule,
  ],
  exports:[
    PollFormComponent,
    NavbarComponent,
    NavPollComponent,
    LinkPreviewComponent
  ],
})
export class SharedModule { }

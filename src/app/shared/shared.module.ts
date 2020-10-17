import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollFormComponent } from './components/poll-form/poll-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NavPollComponent } from './components/nav-poll/nav-poll.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PollFormComponent,
    NavPollComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PollFormComponent,
    NavbarComponent,
    NavPollComponent
  ],
})
export class SharedModule { }

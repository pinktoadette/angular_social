import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { FeedComponent } from './feed.component';

@NgModule({
  declarations: [FeedComponent, FeedDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FeedModule { }

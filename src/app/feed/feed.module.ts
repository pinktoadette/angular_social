import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FeedDetailComponent } from './feed-detail/feed-detail.component';
import { FeedComponent } from './feed.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';

@NgModule({
  declarations: [FeedComponent, FeedDetailComponent, ArticleDetailsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FeedModule { }

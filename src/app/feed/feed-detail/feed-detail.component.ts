import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.scss']
})
export class FeedDetailComponent implements OnInit {
  @Input() articleInfo: Partial<Article>;
  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  articleDetails() {
    this.route.navigate(['/article-details', this.articleInfo['_id']]);
  }

}

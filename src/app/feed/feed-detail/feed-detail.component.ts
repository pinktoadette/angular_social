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
    const title = this.articleInfo['og:title'].trim().replace(/\s/g , "-");
    this.route.navigateByUrl(`/article/${title}`, { state: { articleId: this.articleInfo['_id'], articleInfo: this.articleInfo } });

  }

}

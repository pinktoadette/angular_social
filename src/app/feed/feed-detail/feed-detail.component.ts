import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.scss']
})
export class FeedDetailComponent implements OnInit {
  @Input() articleId: number;
  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  articleDetails() {
    this.route.navigate(['/article-details', this.articleId]);
  }

}

import { Route } from '@angular/compiler/src/core';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.scss']
})
export class FeedDetailComponent implements OnInit {
  @Input() articleId: number;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  innerWidth: number;
  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  articleDetails() {
    this.route.navigate(['/article-details', this.articleId]);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from '../shared/models/article.model';
import { AuthService } from '../shared/services/auth.service';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  articles: Partial<Article>[] = []
  loading: boolean = false;

  _unsubscribe = new Subject();
  constructor(
    private feedService: FeedService,
    private auth: AuthService

  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.feedService.latestFeed().pipe(takeUntil(this._unsubscribe)).subscribe((result)=>{
      const  x = [].concat(result || [])
      this.articles = !this.articles ? x : [...this.articles,...x]
      this.loading = false;
    })
 
  }

  onScrollDown() {
    console.log('scrolled down!!');
  }
 
  onScrollUp() {
    console.log('scrolled up!!');
  }

  onScroll() {
    console.log('scrolled!!');
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}

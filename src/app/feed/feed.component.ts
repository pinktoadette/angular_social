import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Article } from '../shared/models/article.model';
import { AuthService } from '../shared/services/auth.service';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  @HostListener("window:scroll", ['$event'])
  scroll(): void {
    const currDate = new Date()

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.page += 1;
      

      if (window.innerWidth) {
        this.feedService.latestFeed(this.page, currDate).pipe(take(1)).subscribe((result) => {
          const x = [].concat(result || [])
          this.articles = !this.articles ? x : [...this.articles, ...x]
          this.loading = false;
        })
      }
    }
  }

  articles: Partial<Article>[] = []
  loading: boolean = false;

  page: number = 0;

  _unsubscribe = new Subject();
  constructor(
    private feedService: FeedService,
    private auth: AuthService

  ) { }

  ngOnInit(): void {
    this.loading = true;
    const currDate = new Date();

    this.feedService.latestFeed(this.page, currDate).pipe(takeUntil(this._unsubscribe)).subscribe((result) => {
      const x = [].concat(result || [])
      this.articles = !this.articles ? x : [...this.articles, ...x]
      this.loading = false;
    })

  }

  onScrollUp() {
    // this.loading = true;
    // const currDate = new Date();
    // this.feedService.latestFeed(0, currDate).pipe(takeUntil(this._unsubscribe)).subscribe((result) => {
    //   const x = [].concat(result || [])
    //   this.articles = !this.articles ? x : [...this.articles, ...x]
    //   this.loading = false;
    // })
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

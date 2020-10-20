import { Component, OnInit } from '@angular/core';
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
export class FeedComponent implements OnInit {
  articles: Partial<Article>[] = []
  isLoggedIn: boolean = false;
  loading: boolean = false;

  _unsubscribe: Subject<any> = new Subject<any>();
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
    this.isLoggedIn = this.auth.isLoggedIn() === 'true' ? true : false;
 
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

}

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from '../shared/models/article.model';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  articles: Partial<Article>[] = []

  _unsubscribe: Subject<Article> = new Subject<Article>();
  constructor(
    private feedService: FeedService
  ) { }

  ngOnInit(): void {
    this.feedService.latestFeed().pipe(takeUntil(this._unsubscribe)).subscribe(result=>{
      console.log(result)
      this.articles.push(result)
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

}

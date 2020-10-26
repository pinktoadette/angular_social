import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-link-preview',
  templateUrl: './link-preview.component.html',
  styleUrls: ['./link-preview.component.scss']
})
export class LinkPreviewComponent implements OnInit, OnDestroy {
  @Input() linkInfo: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  loading: boolean = false;
  innerWidth: number;
  _unsubscribe = new Subject();
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {  
    // og:video:width, og:video:height: "360", og:video:secure_url, uploadDate
    this.innerWidth = window.innerWidth;
    if (!!this.linkInfo) {
      this.articleService.getArticleMetaTags(this.linkInfo._id).pipe(takeUntil(this._unsubscribe)).subscribe(response => {
        this.linkInfo = {...response, _id: this.linkInfo._id}
      })
    }
  }

  openLink(link) {
    window.open(link, '_blank');
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}

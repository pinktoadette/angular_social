import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-link-preview',
  templateUrl: './link-preview.component.html',
  styleUrls: ['./link-preview.component.scss']
})
export class LinkPreviewComponent implements OnInit {
  @Input() linkInfo: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  metaTags: any;
  loading: boolean = false;
  innerWidth: number;
  _unsubscribe: Subject<any> = new Subject<any>();
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {  
    this.innerWidth = window.innerWidth;
    this.loading = true;
    this.articleService.getArticleMetaTags(this.linkInfo['_id']).pipe(takeUntil(this._unsubscribe)).subscribe((result)=>{
      this.metaTags = result;
      console.log(result)
      this.loading = false;
    })
  }

  openLink(link) {
    window.open(link, '_blank');
  }

}

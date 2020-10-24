import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentComponent } from 'src/app/shared/components/comment/comment.component';
import { Article } from 'src/app/shared/models/article.model';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.scss']
})
export class FeedDetailComponent implements OnInit {
  @Input() articleInfo: Partial<Article>;
  hasComment: boolean = false;

  private _unsubscribe: Subject<any> = new Subject<any>();
  
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments(){
    this.articleService.getArticleTopComment(this.articleInfo._id).pipe(takeUntil(this._unsubscribe)).subscribe(response =>{
    })
  }

  openDialogComment() {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '250px',
      data: {article: this.articleInfo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  articleDetails() {
    const title = this.articleInfo['og:title'].trim().replace(/\s/g , "-");
    this.route.navigateByUrl(`/article/${title}`, { state: { articleId: this.articleInfo['_id'], articleInfo: this.articleInfo } });
  }

}

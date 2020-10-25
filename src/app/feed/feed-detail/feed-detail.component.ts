import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommentComponent } from 'src/app/shared/components/comment/comment.component';
import { Article } from 'src/app/shared/models/article.model';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-feed-detail',
  templateUrl: './feed-detail.component.html',
  styleUrls: ['./feed-detail.component.scss']
})
export class FeedDetailComponent implements OnInit, OnDestroy {
  @Input() articleInfo: Partial<Article>;
  hasComment: boolean = false;
  showComment: {}
  isLike: boolean = false;

  private _unsubscribe = new Subject<any>();
  
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getComments();

    if (this.authService.isLoggedIn() && !!this.articleInfo._id){
      this.getArticleLikes();
    }
  }

  getArticleLikes() {
    this.articleService.getItemLiked({'articleId': this.articleInfo._id}).pipe(take(1)).subscribe(response => {
      // this.isLike = response['like']
    })
  }
  getComments(){ 
    this.articleService.getArticleTopComment(this.articleInfo._id).pipe(takeUntil(this._unsubscribe)).subscribe(response =>{
      if (response['user']) {
        this.showComment = response;
        this.hasComment = true;
      }
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
    const title = this.articleInfo['_id'].trim().replace(/\s/g , "-");
    this.route.navigateByUrl(`/article/${title}`, { state: { articleId: this.articleInfo['_id'], articleInfo: this.articleInfo } });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
this._unsubscribe.complete();;
  }

}

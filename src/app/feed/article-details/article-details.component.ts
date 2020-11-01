import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location} from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from 'src/app/shared/components/comment/comment.component';
import { ArticleService } from 'src/app/shared/services/article.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  @Output() updateResponse: EventEmitter<any> = new EventEmitter();
  articleInfo: Object;
  showComment: Object;
  isLoggedIn: boolean;
  addComment: Object;
  
  private _unsubscribe = new Subject();

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        // search by title
        this.articleService.search('article',params['params']['articleId']).pipe(take(1)).subscribe(result => {
          this.articleInfo = {...result[0]}
        })

      this.articleService.getComments(params['params']['articleId']).pipe(takeUntil(this._unsubscribe)).subscribe(response =>{
        this.showComment = response
      })
    });
    
  }
  newComment(event) {
    this.addComment = event;
    debugger
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
  openLink(link) {
    window.open(link, '_blank');
  }

  backClicked() {
    this._location.back();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SignupPageComponent } from 'src/app/signup-page/signup-page.component';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { CommentResponseComponent } from '../comment-response/comment-response.component';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  @Input() oneComment
  @Input() metaTags;
  @Input() hideType = false;
  @Output() updateResponse: EventEmitter<any> = new EventEmitter();


  articleInfo;
  response: string;
  constructor(
    private route: Router,
    private articleSerivce: ArticleService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  likeComment(response) {
    this.articleSerivce.likeItem({commentId: this.oneComment._id, response}).pipe(take(1)).subscribe(() => {
      this.response = response
      this.updateResponse.emit(true)
    })
  }

  openDialogComment() {

    if (this.authService.isLoggedIn()) {
      const dialogRef = this.dialog.open(CommentResponseComponent, {
        width: '500px',
        panelClass: 'no-padding',
        data: this.oneComment
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result)
      });
    } else {
      this.dialog.open(SignupPageComponent, {
        width: '500px',
        panelClass: 'no-padding',
      });
    }
  }

  articleDetails() {
    const title = this.metaTags['og:title'].trim().replace(/\s/g , "-");
    this.route.navigateByUrl(`/article/${this.metaTags['searchId']}/${title}`, { state: { articleId: this.metaTags.searchId } });
  }

}

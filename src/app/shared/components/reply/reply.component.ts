import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
  @Input() oneComment
  @Input() articleId;

  articleInfo;
  constructor(
    private articleSerivce: ArticleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  likeComment() {
    this.articleSerivce.likeItem({articleId: this.articleId}).pipe(take(1)).subscribe(response => {
      console.log(response)
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

}

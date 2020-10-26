import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  @Input() metaTags;

  articleInfo;
  constructor(
    private route: Router,
    private articleSerivce: ArticleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  likeComment() {
    this.articleSerivce.likeItem({articleId: this.metaTags._id}).pipe(take(1)).subscribe(response => {
      console.log(response)
    })
  }

  openDialogComment() {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '250px',
      data: {article: this.metaTags}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  articleDetails() {
    const title = this.metaTags['og:title'].trim().replace(/\s/g , "-");
    this.route.navigateByUrl(`/article/${this.metaTags['searchId']}/${title}`, { state: { articleId: this.metaTags.searchId } });
  }

}

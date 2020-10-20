import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from 'src/app/shared/components/comment/comment.component';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  articleInfo: Object;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      if (!!window.history.state['articleId']) {
        this.articleInfo = window.history.state['articleInfo']
      } else {
        // search by title
        console.log(params)
      }
  });
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

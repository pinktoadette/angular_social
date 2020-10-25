import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';

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
    private articleSerivce: ArticleService
  ) {}

  ngOnInit(): void {
  }

  likeComment() {
    this.articleSerivce.likeItem({articleId: this.articleId}).pipe(take(1)).subscribe(response => {
      console.log(response)
    })
  }

}

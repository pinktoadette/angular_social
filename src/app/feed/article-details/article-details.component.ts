import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  articleInfo: Object;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute
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

  backClicked() {
    this._location.back();
  }
}

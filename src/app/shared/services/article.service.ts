import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  getHashTags(hashtag) {
    return this.webReqService.post('hashtags',{hashtag}).pipe(tap(data => data))
  }

  submitArticle(article) {
    return this.webReqService.post('articles/submit_url',{...article}).pipe(tap(data => data))
  }

  submitComment(comment) {
    debugger
    return this.webReqService.post('comment/article',{...comment}).pipe(tap(data => data))

  }
}


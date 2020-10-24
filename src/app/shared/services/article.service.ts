import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.webReqService.post('comment/article',{...comment}).pipe(tap(data => data))
  }

  getArticleMetaTags(id){
    return this.webReqService.get('articles/single', {id})
  }

  getArticleTopComment(articleId) {
    return this.webReqService.get('articles/top_comment', {articleId})
  }

  voteArticlePoll(articleId, real) {
    return this.webReqService.post('articles/my_vote', {articleId, real}).pipe(tap(data => data))
  }

  getVoteArticlePoll(articleId): Observable<any> {
    return this.webReqService.get('articles/my_vote', {articleId})
  }

  allVoteTally(articleId) {
    return this.webReqService.get('articles/poll_count', {articleId})
  }

  getMentions(handle) {
    return this.webReqService.get('mentions/', {handle})
  }
}


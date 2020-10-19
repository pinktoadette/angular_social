import { Injectable } from '@angular/core';
import { WebRequestService } from '../shared/services/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  latestFeed() {
    return this.webReqService.get('articles/latest');
  }

  trendArticles() {
    return this.webReqService.get('articles/trend');
  }
  
}

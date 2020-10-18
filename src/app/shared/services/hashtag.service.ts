import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  getHashTags(hashtag) {
    return this.webReqService.post('hashtags',{hashtag}).pipe(tap(data => data))
  }
}

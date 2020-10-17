import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  getHashTags(text) {
    return this.webReqService.post('hashtags',{text})
  }
}

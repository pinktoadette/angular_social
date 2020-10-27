import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private webReqService: WebRequestService) { }

  updateAccount(items) {
    return this.webReqService.patch('account/update', { ...items });
  }

  getProfilePost(handle) {
    return this.webReqService.get('account/posted',{handle});
  }

  getUserProfile(id) {
    return this.webReqService.post('account/view',{id});
  }

}

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

  getProfile(handle) {
    return this.webReqService.get('account/',{handle});
  }

  getUserProfile(id) {
    return this.webReqService.post('account/view',{id});
  }

  checkHandleExist(handle) {
    return this.webReqService.get('account/handle_checks', {handle})
  }
}

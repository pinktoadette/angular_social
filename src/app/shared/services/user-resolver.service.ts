import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { WebRequestService } from './web-request.service';
import { AuthService } from './auth.service';

@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private httpApiSvc: WebRequestService,
    private authService: AuthService
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    if (this.authService.getUserId) {
      return this.authService.getUserId;
    } else {
      return this.httpApiSvc.get('/api/user/').pipe(map(response => {
        return response;
      }));
    }
  }
}

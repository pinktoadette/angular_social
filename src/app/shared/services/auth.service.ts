import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.loggedIn.next(true);
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.body.handle, res.headers.get('X-Access-Token'), res.headers.get('x-refresh-token'));
      })
    )
  }


  signup(email: string, password: string, handle) {
    return this.webService.signup(email, password, handle).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.loggedIn.next(true);
        this.setSession(res.body._id, res.body.handle, res.headers.get('X-Access-Token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }

  checkHandle(handle) {
   return this.webService.get('register/handle', {handle})
  }

  logout() {
    this.loggedIn.next(false);
    this.removeSession();
    this.router.navigate(['/']);
  }

  getAccessToken() {
    return localStorage.getItem('X-Access-Token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserHandle() {
    return localStorage.getItem('handle');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('X-Access-Token', accessToken)
  }

  isLoggedIn() {
    if (this.getAccessToken()) {
      return true;
    }
    return false;
  }

  private setSession(userId: string, handle: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('handle', handle);
    localStorage.setItem('X-Access-Token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
    localStorage.setItem('isLogin', 'true');
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('handle');
    localStorage.removeItem('X-Access-Token');
    localStorage.removeItem('x-refresh-token');
    localStorage.removeItem('isLogin');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/user/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('X-Access-Token'));
      })
    )
  }
}
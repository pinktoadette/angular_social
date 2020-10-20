import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('X-Access-Token'), res.headers.get('x-refresh-token'));
        console.log("LOGGED IN!");
      })
    )
  }


  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('X-Access-Token'), res.headers.get('x-refresh-token'));
        console.log("Successfully signed up and now logged in!");
      })
    )
  }



  logout() {
    this.removeSession();
    this.router.navigate(['/']);
  }

  getAccessToken() {
    return localStorage.getItem('X-Access-Token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('X-Access-Token', accessToken)
  }

  isLoggedIn() {
    return localStorage.getItem('isLogin');
  }
  
  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('X-Access-Token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
    localStorage.setItem('isLogin', 'true');
  }

  private removeSession() {
    localStorage.removeItem('user-id');
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
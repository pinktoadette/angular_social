import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = environment.API_URL;
  }

  get(uri: string, search_params = null) {
    if (search_params) {
      let params = new HttpParams();
      for (let key of Object.keys(search_params)) {
        params = params.append(key, search_params[key]);
      }
      let options = {
        params
     }
      return this.http.get(`${this.ROOT_URL}/${uri}`, options);  
    }
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/login`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  signup(email: string, password: string, handle: string) {
    const body= {
      email,
      password,
      handle
    };

    return this.http.post(`${this.ROOT_URL}/register`, body, {
        observe: 'response'
      });
  }


}

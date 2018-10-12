import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token = sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')).token : '';

  headers = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : this.token
    })
  }

  setToken(token){
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : token
      })
    }
  }

  constructor(private http: HttpClient) { }

  ApiWithUpload(url, data){
    let headers = {
    headers: new HttpHeaders({
      'Authorization' : this.token
    })
  }

    return this.http.post(environment.API + url, data, headers);
  }

  ApiPost(url, data){
    return this.http.post(environment.API + url, data, this.headers);
  }

  ApiGet(url){
    return this.http.get(environment.API + url, this.headers);
  }

  ApiGetNavigate(url){
    return this.http.get(url, this.headers);
  }
}

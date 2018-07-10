import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token = sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')).token : '';
  endPoint = 'http://portal.test/api/';
 // endPoint = 'http://portal.test';

  headers = {
    headers: new HttpHeaders({     
      'Content-Type' : 'application/json',
      'Authorization' : this.token
    })
  }

  constructor(private http: HttpClient) { }


  getApiPost(url, data){
    return this.http.post(this.endPoint + url, data, this.headers);
  }

  getApiGet(url){
    return this.http.get(this.endPoint + url, this.headers);
  }
}

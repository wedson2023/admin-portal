import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  endPoint = 'http://portal.test/api/';
 // endPoint = 'http://portal.test';

  constructor(private http: HttpClient) { }

  getApiPost(url, data){
    return this.http.post(this.endPoint + url, data)
  }
}

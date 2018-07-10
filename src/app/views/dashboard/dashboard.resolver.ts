import { HttpService } from './../../http.service';
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class DashboardResolver implements Resolve<Observable<any>> {
  constructor(private http: HttpService) {}

  resolve() {
    return this.http.getApiGet('dashboard');
  }
}
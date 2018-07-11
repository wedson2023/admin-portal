import { AuthService } from './auth.service';
import { HttpService } from './../http.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean {
    this.auth.validaSessao();

    if(!this.auth.getLogado())   
    {
      swal('Error', 'Você não tem autorização.', 'error'); 
      this.router.navigate(['']);     
      return false;
    }  
    else
    {
      return true;
    }   
  }
}

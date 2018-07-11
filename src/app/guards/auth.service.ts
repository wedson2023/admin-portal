import { HttpService } from './../http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  verifica;

  constructor(private http: HttpService) {}  

  validaSessao(){
    this.http.ApiGet('validar-sessao').subscribe((response:any) => {      
        this.verifica = response.resposta;
    }, err => {
      this.verifica = false;
    }) 
  }

  getLogado(){
    return this.verifica;
  }
}

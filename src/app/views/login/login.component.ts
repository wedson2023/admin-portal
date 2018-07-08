import { HttpService } from './../../http.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})


export class LoginComponent { 

  usuario:object = { nome : null, senha : null };

  constructor(
    private router: Router,
    private http: HttpService
  ){

  }

  login(usuario){
    if(!usuario.nome || !usuario.senha)
    {
      swal('Atenção', 'Os campos precisam ser preenchidos.', 'warning');
    }
    else
    {
      this.http.getApiPost('login', usuario).subscribe(response => {
        sessionStorage.setItem('usuario', JSON.stringify(response));
        this.router.navigate(['dashboard']);
      }, err => {
        swal('Erro', err.error.resposta, 'error');
      })
    } 
  }
}

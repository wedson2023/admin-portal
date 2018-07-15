import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {

  dados:object = {
    nome : null
  };

  constructor(private http: HttpService, private progresso: NgProgressService) {}

  cadastrar(){
    if(!this.dados['nome'])
    {
      swal('Atenção', 'O campo nome é requerido', 'warning');
      return false;   
    }

    this.progresso.start();  

    this.http.ApiPost('categorias/cadastro', this.dados).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.dados['nome'] = null;
      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })
  }

}

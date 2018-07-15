import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-segmentos',
  templateUrl: './segmentos.component.html',
  styleUrls: ['./segmentos.component.scss']
})
export class SegmentosComponent implements OnInit {

  categorias;
  dados:object = {
    nome : null,
    categoria_id : null
  };

  constructor(private http: HttpService, private progresso: NgProgressService) {}

  ngOnInit(){
    this.progresso.start();
    this.http.ApiGet('categorias/listar').subscribe((response:any) => {
      this.categorias = response.resposta;
      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })
  }  

  cadastrar(){
    if(!this.dados['nome'] || !this.dados['categoria_id'])
    {
      swal('Atenção', 'Os campo é requerido', 'warning');
      return false;   
    }

    this.progresso.start();  

    this.http.ApiPost('segmentos/cadastro', this.dados).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.dados['nome'] = null;
      this.progresso.done();
    }, err => {;
      swal('Error', err.error.resposta, 'error');
      this.progresso.done();
    })
  }

}

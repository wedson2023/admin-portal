import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  dados:any = {
    link : null,
    titulo : null,
    descricao : null
  };
  constructor(private http: HttpService, private progresso: NgProgressService) {}

  ngOnInit() {
  }

  cadastrar(){
    if(!this.dados.link || !this.dados.titulo || !this.dados.descricao)
    {
      swal('Atenção', 'Os campos são requeridos', 'warning');
      return false;
    }

    this.progresso.start();

    this.http.ApiPost('videos/cadastro', { link : this.dados.link, titulo : this.dados.titulo, descricao : this.dados.descricao } ).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.dados.link = null;
      this.dados.titulo = null;
      this.dados.descricao = null;
      this.progresso.done();
    }, err => {
      swal('Error', err.error.resposta, 'error');
      this.progresso.done();
    })
  }

}

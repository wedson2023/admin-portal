import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  video;
  constructor(private http: HttpService, private progresso: NgProgressService) {}

  ngOnInit() {
  }

  cadastrar(){
    if(!this.video)
    {
      swal('Atenção', 'O campo link é requerido', 'warning');
      return false;
    }

    this.progresso.start();

    this.http.ApiPost('videos/cadastro', { nome : this.video } ).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.video = null;
      this.progresso.done();
    }, err => {
      swal('Error', err.error.resposta, 'error');
      this.progresso.done();
    })
  }

}

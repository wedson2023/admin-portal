import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  @ViewChild('arquivo') arquivo: ElementRef;
  payload = new FormData();
  dados:object = {
    imagem : null,
    tamanho : ''
  };

  constructor(private http: HttpService, private progresso: NgProgressService) {}

  onChangeImagem(event){
    this.dados['imagem'] = event.target.files[0];
    this.payload.append('imagem', event.target.files[0]);
  }

  cadastrar(){
    if(!this.dados['tamanho'] || !this.dados['imagem'])
    {
      swal('Atenção', 'Os campo é requerido', 'warning');
      return false;   
    }

    this.progresso.start(); 
    
    this.payload.append('tamanho', this.dados['tamanho']);

    this.http.ApiWithUpload('banner/cadastro', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.dados['tamanho'] = '';
      this.arquivo.nativeElement.value = '';
      this.progresso.done();
    }, err => {;
      swal('Error', err.error, 'error');
      this.progresso.done();
    })
  }

}
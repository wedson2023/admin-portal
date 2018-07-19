import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-botoes',
  templateUrl: './botoes.component.html',
  styleUrls: ['./botoes.component.scss']
})
export class BotoesComponent {
  payload = new FormData();
  dados = {
    nome : null,
    arquivo : null
  };

  @ViewChild('arquivo') arquivo: ElementRef;

  constructor(private http: HttpService, private progresso: NgProgressService) {}
  
  onChangeArquivo(event){
    this.dados['arquivo'] = event.target.files[0];
    this.payload.append('arquivo', event.target.files[0]);
  }

  cadastrar(){
    if(!this.dados['nome'])
    {
      swal('Atenção', 'O campo nome é requerido', 'warning');
      return false;   
    }

    this.progresso.start();  
    this.payload.append('nome', this.dados['nome']);

    this.http.ApiWithUpload('botoes/cadastro', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.dados['nome'] = null;
      this.arquivo.nativeElement.value = '';
      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })
  }

}

import { HttpService } from './../../http.service';
import { Component } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-guia-comercial',
  templateUrl: './guia-comercial.component.html',
  styleUrls: ['./guia-comercial.component.scss']
})
export class GuiaComercialComponent {
  payload = new FormData();
  dados:object = {
    nome : null,
    capa : null,
    endereco : null,
    telefones : null,
    horario : null,
    formas_pagamento : null,
    ativo : 1,
    template : null,
    contato : {}
  };

  constructor(private http: HttpService) {}
  
  onChangeCapa(event){
    this.dados['capa'] = event.target.files[0];
    this.payload.append('capa', event.target.files[0]);
  }

  plugins:object = {
    language_url: 'http://portal.test/tinymce_langs/pt_BR.js',
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
    plugins: 'advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor'
  };

  cadastrar(){
    if(!this.dados['nome'] || this.dados['ativo'] == null)
    {
      swal('Atenção', 'Os campos nome e ativo são requeridos', 'warning');
      return false;   
    }
  
    this.payload.append('nome', this.dados['nome']);
    this.payload.append('endereco', this.dados['endereco']);
    this.payload.append('telefones', this.dados['telefones']);
    this.payload.append('horario', this.dados['horario']);
    this.payload.append('formas_pagamento', this.dados['formas_pagamento']);
    this.payload.append('template', this.dados['template']);
    this.payload.append('ativo', this.dados['ativo']);

    this.payload.append('contato[site]', (this.dados['contato'].site || null));
    this.payload.append('contato[email]', (this.dados['contato'].email || null));
    this.payload.append('contato[facebook]', (this.dados['contato'].facebook || null));

    this.http.ApiWithUpload('guia-comercial/cadastro', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
    }, err => {
      swal('Error', err.message, 'error');
    })
  }

}

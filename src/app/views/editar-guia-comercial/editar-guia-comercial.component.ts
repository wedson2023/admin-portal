import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-editar-guia-comercial',
  templateUrl: './editar-guia-comercial.component.html',
  styleUrls: ['./editar-guia-comercial.component.scss']
})
export class EditarGuiaComercialComponent implements OnInit {

  empresa_id;
  segmentos;
  payload = new FormData();
  dados = {
    nome : null,
    capa : null,
    endereco : null,
    telefones : null,
    horario : null,
    cidade : null,
    segmento_id : null,
    formas_pagamento : null,
    ativo : '1',
    destaque : '0',
    template : null,
    contato : {
      site : null,
      email : null,
      facebook : null
    }
  };

  constructor(
    private http: HttpService,
    private progresso: NgProgressService,
    private router: Router,
    private param: ActivatedRoute
  ) {
    this.empresa_id = this.param.snapshot.params['id'];
  }

  ngOnInit() {
    this.progresso.start();
    this.http.ApiGet('guia-comercial/listar/' + this.empresa_id).subscribe((response:any) => {
      this.dados = response.resposta;
      let contatos = response.resposta.contato;
      this.dados.contato.site = contatos.filter(e => e.nome == 'site').length ? contatos.filter(e => e.nome == 'site')[0].url : null;
      this.dados.contato.email = contatos.filter(e => e.nome == 'email').length ? contatos.filter(e => e.nome == 'email')[0].url : null;
      this.dados.contato.facebook = contatos.filter(e => e.nome == 'facebook').length ? contatos.filter(e => e.nome == 'facebook')[0].url : null;

      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })

    this.progresso.start();
    this.http.ApiGet('segmentos/listar').subscribe((response:any) => {
      this.segmentos = response.resposta;
      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })

  }

  onChangeCapa(event){
    this.dados['capa'] = event.target.files[0];
    this.payload.append('capa', event.target.files[0]);
  }

  plugins:object = {
    language_url: 'http://portal.test/tinymce_langs/pt_BR.js',
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
    plugins: 'advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor'
  };

  limpar(){
    this.dados = {
      nome : null,
      capa : null,
      endereco : null,
      telefones : null,
      horario : null,
      cidade : null,
      segmento_id : null,
      formas_pagamento : null,
      ativo : '1',
      destaque : '0',
      template : null,
      contato : {
        site : null,
        email : null,
        facebook : null
      }
    };
  }

  cadastrar(){
    if(!this.dados['nome'] || !this.dados['segmento_id'] || this.dados['ativo'] == null)
    {
      swal('Atenção', 'Os campos nome, segmentos e ativo são requeridos', 'warning');
      return false;
    }

    this.progresso.start();

    this.payload.append('id', this.empresa_id);
    this.payload.append('nome', this.dados['nome']);
    this.payload.append('endereco', this.dados['endereco']);
    this.payload.append('telefones', this.dados['telefones']);
    this.payload.append('horario', this.dados['horario']);
    this.payload.append('segmento_id', this.dados['segmento_id']);
    this.payload.append('cidade', this.dados['cidade']);
    this.payload.append('formas_pagamento', this.dados['formas_pagamento']);
    this.payload.append('template', this.dados['template']);
    this.payload.append('ativo', this.dados['ativo']);
    this.payload.append('destaque', this.dados['destaque']);

    this.payload.append('contato[site]', (this.dados['contato'].site || null));
    this.payload.append('contato[email]', (this.dados['contato'].email || null));
    this.payload.append('contato[facebook]', (this.dados['contato'].facebook || null));

    this.http.ApiWithUpload('guia-comercial/editar', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Registro alterado com sucesso.', 'success');
      this.progresso.done();
    }, err => {
      this.progresso.done();
      swal('Error', err.message, 'error');
    })
  }

}

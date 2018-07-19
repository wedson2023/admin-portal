import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-agenda-de-eventos',
  templateUrl: './agenda-de-eventos.component.html',
  styleUrls: ['./agenda-de-eventos.component.scss']
})
export class AgendaDeEventosComponent implements OnInit{

  payload = new FormData();
  categorias;
  dados = {
    nome : null,
    cartaz : null,
    local : null,
    data : null,
    template : null,
    site : null,
    categoria_id : 'Selecione um item'
  };

  plugins:object = {
    language_url: 'http://portal.test/tinymce_langs/pt_BR.js',
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
    plugins: 'advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor'
  };

  @ViewChild('arquivo') arquivo: ElementRef;

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
  
  onChangeCartaz(event){
    this.dados['cartaz'] = event.target.files[0];
    this.payload.append('cartaz', event.target.files[0]);
  }

  limpar(){
    this.dados = {
      nome : null,
      cartaz : null,
      local : null,
      data : null,
      template : null,
      site : null,
      categoria_id : 'Selecione um item'
    };

    this.arquivo.nativeElement.value = '';
  }

  cadastrar(){
    if(!this.dados['nome'] || !this.dados['local'] || this.dados['data'] == null || this.dados['categoria_id'] == null)
    {
      swal('Atenção', 'Os campos são requeridos', 'warning');
      return false;   
    }

    this.progresso.start();
  
    this.payload.append('nome', this.dados['nome']);
    this.payload.append('local', this.dados['local']);
    this.payload.append('data', this.dados['data']);
    this.payload.append('template', this.dados['template']);
    this.payload.append('site', this.dados['site']);
    this.payload.append('categoria_id', this.dados['categoria_id']);

    this.http.ApiWithUpload('eventos/cadastro', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.limpar();
      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })
  }

}

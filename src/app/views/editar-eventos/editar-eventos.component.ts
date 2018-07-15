import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-agenda-de-eventos',
  templateUrl: './editar-eventos.component.html',
  styleUrls: ['./editar-eventos.component.scss']
})
export class EditarEventosComponent implements OnInit {

  evento_id;
  payload = new FormData();
  categorias;
  dados:object = {
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
  @ViewChild('data') data: ElementRef;

  constructor(
    private http: HttpService,
    private progresso: NgProgressService,
    private router: Router,
    private param: ActivatedRoute
  ) { 
    this.evento_id = this.param.snapshot.params['id'];    
  }

  ngOnInit(){
    this.progresso.start();

    this.http.ApiGet('eventos/listar/' + this.evento_id).subscribe((response:any) => {      
      this.dados = response.resposta;
      this.dados['data'] = new Date(response.resposta.data).toISOString().substr(0, 19);
      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })

    this.http.ApiGet('categorias/listar').subscribe((response:any) => {
      this.categorias = response.resposta;
    }, err => {
      swal('Error', err.error, 'error');
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
      categoria_id : null
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
  
    this.payload.append('id', this.evento_id);
    this.payload.append('nome', this.dados['nome']);
    this.payload.append('local', this.dados['local']);
    this.payload.append('data', this.dados['data']);
    this.payload.append('template', this.dados['template']);
    this.payload.append('site', this.dados['site']);
    this.payload.append('categoria_id', this.dados['categoria_id']);

    this.http.ApiWithUpload('eventos/editar', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.progresso.done();
    }, err => {
      swal('Error', err.error, 'error');
      this.progresso.done();
    })
  }

}

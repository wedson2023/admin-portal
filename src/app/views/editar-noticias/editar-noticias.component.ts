import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-noticias',
  templateUrl: './editar-noticias.component.html',
  styleUrls: ['./editar-noticias.component.scss']
})
export class EditarNoticiasComponent implements OnInit {

  noticia_id;

  payload = new FormData();
  dados = {
    fonte : null,
    capa : null,
    titulo : null,
    subtitulo : null,
    categoria : null,
    ativo : '1',
    destaque : '0',
    template : null
  };

  plugins:object = {
    language_url: 'http://portal.test/tinymce_langs/pt_BR.js',
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
    plugins: 'advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor'
  };

  @ViewChild('arquivo') arquivo: ElementRef;

  constructor(
    private http: HttpService,
    private progresso: NgProgressService,
    private router: Router,
    private param: ActivatedRoute
  ) { 
    this.noticia_id = this.param.snapshot.params['id'];    
  }

  ngOnInit() {
    this.progresso.start();
    this.http.ApiGet('noticias/listar/' + this.noticia_id).subscribe((response:any) => {      
      this.dados = response.resposta;     
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

  limpar(){
    this.dados = {
      fonte : null,
      capa : null,
      titulo : null,
      subtitulo : null,
      categoria : null,
      ativo : '1',
      destaque : '0',
      template : null
    };
  }

  cadastrar(){
    if(!this.dados['fonte'] || !this.dados['capa'] || !this.dados['titulo'] || this.dados['ativo'] == null || this.dados['destaque'] == null || !this.dados['template'])
    {
      swal('Atenção', 'Os campos são requeridos', 'warning');
      return false;   
    }

    this.progresso.start();
  
    this.payload.append('id', this.noticia_id);
    this.payload.append('fonte', this.dados['fonte']);
    this.payload.append('titulo', this.dados['titulo']);
    this.payload.append('subtitulo', this.dados['subtitulo']);
    this.payload.append('ativo', this.dados['ativo']);
    this.payload.append('categoria', this.dados['categoria']);
    this.payload.append('destaque', this.dados['destaque']);
    this.payload.append('template', this.dados['template']);

    this.http.ApiWithUpload('noticias/editar', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
      this.progresso.done();
    }, err => {
      swal('Error', err.message, 'error');
      this.progresso.done();
    })
  }

}

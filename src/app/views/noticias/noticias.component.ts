import { HttpService } from './../../http.service';
import { Component } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent{
  
  payload = new FormData();
  dados:object = {
    fonte : null,
    capa : null,
    titulo : null,
    subtitulo : null,
    ativo : 1,
    destaque : 0,
    template : null
  };

  plugins:object = {
    language_url: 'http://portal.test/tinymce_langs/pt_BR.js',
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons',
    plugins: 'advlist autolink link image lists charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor'
  };

  constructor(private http: HttpService) {}
  
  onChangeCapa(event){
    this.dados['capa'] = event.target.files[0];
    this.payload.append('capa', event.target.files[0]);
  }

  cadastrar(){
    if(!this.dados['fonte'] || !this.dados['capa'] || !this.dados['titulo'] || this.dados['ativo'] == null || this.dados['destaque'] == null || !this.dados['template'])
    {
      swal('Atenção', 'Os campos são requeridos', 'warning');
      return false;   
    }
  
    this.payload.append('fonte', this.dados['fonte']);
    this.payload.append('titulo', this.dados['titulo']);
    this.payload.append('subtitulo', this.dados['subtitulo']);
    this.payload.append('ativo', this.dados['ativo']);
    this.payload.append('destaque', this.dados['destaque']);
    this.payload.append('template', this.dados['template']);

    this.http.ApiWithUpload('noticias/cadastro', this.payload).subscribe((response:any) => {
      swal('Sucesso', 'Cadastro realizado com sucesso.', 'success');
    }, err => {
      swal('Error', err.message, 'error');
    })
  }

}

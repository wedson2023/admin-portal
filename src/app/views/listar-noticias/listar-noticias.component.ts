import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-noticias',
  templateUrl: './listar-noticias.component.html',
  styleUrls: ['./listar-noticias.component.scss']
})
export class ListarNoticiasComponent implements OnInit {

  public noticias;
  constructor(private http: HttpService, private progresso: NgProgressService, private router: Router) { }

  editar(data){
    this.router.navigate(['/editar-noticias/', data.id]);
  }

  deletar(data){
    swal({
      title: "Atenção",
      text: "Tem certeza que deseja deletar esse registro?",
      icon: "warning",
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this.progresso.start();
        this.http.ApiPost('noticias/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.noticias.data.splice(this.noticias.data.indexOf(data), 1);
          this.progresso.done();
        }, err => {
          swal('Error', err.error, 'error');
          this.progresso.done();
        });
      }
    });    
  }

  ngOnInit() {
    this.progresso.start();
    this.http.ApiGet('noticias/listar').subscribe((response:any) => {
      this.progresso.done();
      this.noticias = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
      this.progresso.done();
    });
  }

  next(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.noticias.next_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.noticias = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

  prev(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.noticias.prev_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.noticias = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

}

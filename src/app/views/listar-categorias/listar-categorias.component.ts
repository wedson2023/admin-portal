import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit {

  public categorias;
  constructor(private http: HttpService, private progresso: NgProgressService) { }

  deletar(data){
    swal({
      title: "Atenção",
      text: "Tem certeza que deseja deletar esse registro, essa ação removerá os segmentos dessa categoria?",
      icon: "warning",
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this.progresso.start();
        this.http.ApiPost('categorias/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.categorias.data.splice(this.categorias.data.indexOf(data), 1);
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
    this.http.ApiGet('categorias/listar-todos').subscribe((response:any) => {
      this.progresso.done();
      this.categorias = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
      this.progresso.done();
    });
  }

  next(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.categorias.next_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.categorias = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

  prev(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.categorias.prev_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.categorias = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

}

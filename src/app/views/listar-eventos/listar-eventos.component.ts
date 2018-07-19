import { HttpService } from './../../http.service';
import { Component, OnInit } from '@angular/core';
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.scss']
})
export class ListarEventosComponent implements OnInit {

  public eventos;
  constructor(private http: HttpService, private progresso: NgProgressService, private router: Router) { }

  editar(data){
    this.router.navigate(['/editar-eventos/', data.id]);
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
        this.http.ApiPost('eventos/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.eventos.data.splice(this.eventos.data.indexOf(data), 1);
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
    this.http.ApiGet('eventos/listar').subscribe((response:any) => {
      this.progresso.done();
      this.eventos = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
      this.progresso.done();
    });
  }

  next(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.eventos.next_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.eventos = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

  prev(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.eventos.prev_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.eventos = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

}

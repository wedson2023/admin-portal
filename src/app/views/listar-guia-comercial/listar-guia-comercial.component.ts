import { HttpService } from './../../http.service';
import { Component, OnInit } from '@angular/core';
import {NgProgressService} from "ng2-progressbar";
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-guia-comercial',
  templateUrl: './listar-guia-comercial.component.html',
  styleUrls: ['./listar-guia-comercial.component.scss']
})
export class ListarGuiaComercialComponent implements OnInit {

  private empresas;
  constructor(private http: HttpService, private progresso: NgProgressService, private router: Router) { }

  editar(data){
    this.router.navigate(['/editar-guia-comercial/', data.id]);
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
        this.http.ApiPost('guia-comercial/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.empresas.data.splice(this.empresas.data.indexOf(data), 1);
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
    this.http.ApiGet('guia-comercial/listar').subscribe((response:any) => {
      this.progresso.done();
      this.empresas = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
      this.progresso.done();
    });
  }

  next(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.empresas.next_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.empresas = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

  prev(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.empresas.prev_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.empresas = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

}

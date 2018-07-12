import { HttpService } from './../../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-guia-comercial',
  templateUrl: './listar-guia-comercial.component.html',
  styleUrls: ['./listar-guia-comercial.component.scss']
})
export class ListarGuiaComercialComponent implements OnInit {

  private empresas;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.ApiGet('guia-comercial/listar').subscribe((response:any) => {
      console.log(response);
      this.empresas = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
    });
  }

  next(){
    this.http.ApiGetNavigate(this.empresas.next_page_url).subscribe((response:any) => {
      this.empresas = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
    });
  }

  prev(){
    this.http.ApiGetNavigate(this.empresas.prev_page_url).subscribe((response:any) => {
      this.empresas = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
    });
  }

}

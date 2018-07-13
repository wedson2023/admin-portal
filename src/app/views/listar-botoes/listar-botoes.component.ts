import { Component, OnInit } from '@angular/core';
import { NgProgressService } from 'ng2-progressbar';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-listar-botoes',
  templateUrl: './listar-botoes.component.html',
  styleUrls: ['./listar-botoes.component.scss']
})
export class ListarBotoesComponent implements OnInit {

  private botoes;
  constructor(private http: HttpService, private progresso: NgProgressService) { }

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
        this.http.ApiPost('botoes/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.botoes.data.splice(this.botoes.data.indexOf(data), 1);
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
    this.http.ApiGet('botoes/listar').subscribe((response:any) => {
      this.progresso.done();
      this.botoes = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
      this.progresso.done();
    });
  }

}

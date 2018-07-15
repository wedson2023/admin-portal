import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-listar-segmentos',
  templateUrl: './listar-segmentos.component.html',
  styleUrls: ['./listar-segmentos.component.scss']
})
export class ListarSegmentosComponent implements OnInit {

  private segmentos;
  constructor(private http: HttpService, private progresso: NgProgressService) { }

  deletar(data){
    swal({
      title: "Atenção",
      text: "Tem certeza que deseja deletar esse registro",
      icon: "warning",
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this.progresso.start();
        this.http.ApiPost('segmentos/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.segmentos.data.splice(this.segmentos.data.indexOf(data), 1);
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
    this.http.ApiGet('segmentos/listar-todos').subscribe((response:any) => {
      this.progresso.done();
      this.segmentos = response.registros;
    }, err => {
      swal('Erro', err.error.resposta, 'error');
      this.progresso.done();
    });
  }

  next(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.segmentos.next_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.segmentos = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

  prev(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.segmentos.prev_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.segmentos = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

}

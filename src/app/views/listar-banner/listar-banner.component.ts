import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';

@Component({
  selector: 'app-listar-banner',
  templateUrl: './listar-banner.component.html',
  styleUrls: ['./listar-banner.component.scss']
})
export class ListarBannerComponent implements OnInit {

  private banners;
  private url = 'http://portaldoguia.com.br/uploads/banner/';
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
        this.http.ApiPost('banner/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.banners.data.splice(this.banners.data.indexOf(data), 1);
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
    this.http.ApiGet('banner/listar-todos').subscribe((response:any) => {
      this.progresso.done();
      this.banners = response.registros;
    }, err => {
      swal('Erro', err.error, 'error');
      this.progresso.done();
    });
  }

  next(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.banners.next_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.banners = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

  prev(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.banners.prev_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.banners = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

}

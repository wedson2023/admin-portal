import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { NgProgressService } from 'ng2-progressbar';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-listar-contato',
  templateUrl: './listar-contato.component.html',
  styleUrls: ['./listar-contato.component.scss']
})
export class ListarContatoComponent implements OnInit {

  public myModal;
  public smallModal;
  public primaryModal;
  public successModal;
  public warningModal;
  public dangerModal;
  public infoModal;
  @ViewChild('largeModal') largeModal;

  public contato;
  public contatos;
  constructor(private http: HttpService, private progresso: NgProgressService) { }

  public largeModalShow(contato): void {
    this.contato = contato;
    console.log(contato);
    this.largeModal.show();    
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
        this.http.ApiPost('contatos/deletar', { id : data.id }).subscribe((response) => {
          swal('Sucesso', 'Registro deletado com sucesso.', 'success');
          this.contatos.data.splice(this.contatos.data.indexOf(data), 1);
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
    this.http.ApiGet('contatos/listar-todos').subscribe((response:any) => {
      this.progresso.done();
      this.contatos = response.registros;
    }, err => {
      swal('Erro', err.error, 'error');
      this.progresso.done();
    });
  }

  next(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.contatos.next_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.contatos = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

  prev(){
    this.progresso.start();
    this.http.ApiGetNavigate(this.contatos.prev_page_url).subscribe((response:any) => {
      this.progresso.done();
      this.contatos = response.registros;
    }, err => {
      this.progresso.done();
      return false;
    });
  }

}

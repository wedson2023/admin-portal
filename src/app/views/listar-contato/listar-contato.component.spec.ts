import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContatoComponent } from './listar-contato.component';

describe('ListarContatoComponent', () => {
  let component: ListarContatoComponent;
  let fixture: ComponentFixture<ListarContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

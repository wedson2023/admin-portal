import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarGuiaComercialComponent } from './listar-guia-comercial.component';

describe('ListarGuiaComercialComponent', () => {
  let component: ListarGuiaComercialComponent;
  let fixture: ComponentFixture<ListarGuiaComercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarGuiaComercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarGuiaComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

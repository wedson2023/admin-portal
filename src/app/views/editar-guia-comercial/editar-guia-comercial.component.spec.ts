import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGuiaComercialComponent } from './editar-guia-comercial.component';

describe('EditarGuiaComercialComponent', () => {
  let component: EditarGuiaComercialComponent;
  let fixture: ComponentFixture<EditarGuiaComercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGuiaComercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGuiaComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

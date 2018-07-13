import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBotoesComponent } from './listar-botoes.component';

describe('ListarBotoesComponent', () => {
  let component: ListarBotoesComponent;
  let fixture: ComponentFixture<ListarBotoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBotoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBotoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

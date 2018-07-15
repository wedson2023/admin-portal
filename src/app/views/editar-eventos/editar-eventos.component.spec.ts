import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAgendaDeEventosComponent } from './editar-agenda-de-eventos.component';

describe('EditarAgendaDeEventosComponent', () => {
  let component: EditarAgendaDeEventosComponent;
  let fixture: ComponentFixture<EditarAgendaDeEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAgendaDeEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAgendaDeEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDeEventosComponent } from './agenda-de-eventos.component';

describe('AgendaDeEventosComponent', () => {
  let component: AgendaDeEventosComponent;
  let fixture: ComponentFixture<AgendaDeEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaDeEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaDeEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

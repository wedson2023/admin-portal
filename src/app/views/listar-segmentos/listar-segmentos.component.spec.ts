import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSegmentosComponent } from './listar-segmentos.component';

describe('ListarSegmentosComponent', () => {
  let component: ListarSegmentosComponent;
  let fixture: ComponentFixture<ListarSegmentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSegmentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSegmentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaComercialComponent } from './guia-comercial.component';

describe('GuiaComercialComponent', () => {
  let component: GuiaComercialComponent;
  let fixture: ComponentFixture<GuiaComercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaComercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBannerComponent } from './listar-banner.component';

describe('ListarBannerComponent', () => {
  let component: ListarBannerComponent;
  let fixture: ComponentFixture<ListarBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

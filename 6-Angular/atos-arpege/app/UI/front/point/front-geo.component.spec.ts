import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontGeoComponent } from './front-geo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FrontGeoComponent', () => {
  let component: FrontGeoComponent;
  let fixture: ComponentFixture<FrontGeoComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrontGeoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

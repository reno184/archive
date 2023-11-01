import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAltitudeComponent } from './panel-altitude.component';

describe('ElevationScaleComponent', () => {
  let component: PanelAltitudeComponent;
  let fixture: ComponentFixture<PanelAltitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelAltitudeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAltitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

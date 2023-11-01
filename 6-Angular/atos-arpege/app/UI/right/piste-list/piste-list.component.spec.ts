import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PisteListComponent } from './piste-list.component';

describe('PisteListComponent', () => {
  let component: PisteListComponent;
  let fixture: ComponentFixture<PisteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PisteListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PisteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

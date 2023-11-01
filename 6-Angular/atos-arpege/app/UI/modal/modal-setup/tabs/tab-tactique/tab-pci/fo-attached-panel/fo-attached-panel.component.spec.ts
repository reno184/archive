import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoAttachedPanelComponent } from './fo-attached-panel.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FoAttachedPanelComponent', () => {
  let component: FoAttachedPanelComponent;
  let fixture: ComponentFixture<FoAttachedPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FoAttachedPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoAttachedPanelComponent);
    component = fixture.componentInstance;
    spyOn(component.clickedEvent, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit select Fo id to parent componene to display FO detail information', () => {
    component.onClickDetail('3');
    expect(component.clickedEvent.emit).toHaveBeenCalledWith('3');
  });
});


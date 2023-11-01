import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PciFoPanelComponent } from './pci-fo-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { FoState } from '../../../../../../../store/featureStates/fo/fo.reducer';
import { AppInitService } from '../../../../../../../app.init.service';

describe('PciFoPanelComponent', () => {
  let component: PciFoPanelComponent;
  let fixture: ComponentFixture<PciFoPanelComponent>;
  let mockStore: MockStore<FoState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [provideMockStore(), { provide: AppInitService, useValue: { staticDatas: { labels: {} } } }],
      declarations: [PciFoPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PciFoPanelComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

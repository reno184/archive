import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarBottomComponent } from './bar-bottom.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getLatlng, SettingState } from '../../store/featureStates/unit-setting/unit-setting.reducer';
import { AppInitService } from '../../app.init.service';
import { MapInteractiveService } from '../../shared/services/map-interactive.service';


describe('BarBottomComponent', () => {
  let component: BarBottomComponent;
  let fixture: ComponentFixture<BarBottomComponent>;
  let mockStore: MockStore<any>;
  let unitMock: MemoizedSelector<SettingState, string>;
  let service: MapInteractiveService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarBottomComponent],
      providers: [{
        provide: AppInitService,
        useValue: { configDatas: { logo: '', version: '' } }
      }, provideMockStore(), MapInteractiveService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarBottomComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    unitMock = mockStore.overrideSelector(getLatlng, 'dd');
    service = TestBed.get(MapInteractiveService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoListComponent } from './fo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { FoState, getFoAll, getFoLoading } from '../../../../store/featureStates/fo/fo.reducer';
import { MemoizedSelector, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FoModel } from '@arpege/models';
import { AppInitService } from '../../../../app.init.service';

describe('FoListComponent', () => {
  let component: FoListComponent;
  let fixture: ComponentFixture<FoListComponent>;
  let mockStore: MockStore<FoState>;
  let listMock: MemoizedSelector<FoState, FoModel[]>;
  let loadingMock: MemoizedSelector<FoState, boolean>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FoListComponent],
      providers: [provideMockStore(), { provide: AppInitService, useValue: { staticDatas: { labels: {} } } }],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    listMock = mockStore.overrideSelector(getFoAll, []);
    loadingMock = mockStore.overrideSelector(getFoLoading, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loader icon when datas loading', () => {
    loadingMock.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.test-loading'))[0].nativeElement
    ).toBeTruthy();
  });

  it('should display box open icon if no datas', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.test-empty'))[0].nativeElement
    ).toBeTruthy();
  });

  it('should display list items if datas array is not empty', () => {
    listMock.setResult([{
      id: '0',
      FO_COLOR: '',
      FO_NAME: '',
      FO_STATUS: true,
      FO_MODE: '0',
      FO_FREQ: 0,
      FO_LI: 0,
      FO_PRI: 0,
      FO_RT: 0,
      FO_ATTEN: 0,
      FO_CLASS: '0',
      FO_MAX_TARGET: 0,
      FO_KILL_STATUS: 'true',
      FO_KILL: 0,
      FO_ALT_MIN: 0,
      FO_ALT_MAX: 0,
      FO_RAD_MIN: 0,
      FO_RAD_MAX: 0
    }]);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.test-not-empty'))[0].nativeElement
    ).toBeTruthy();
  });
});

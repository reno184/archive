/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPciComponent } from './tab-pci.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, MemoizedSelectorWithProps, Store } from '@ngrx/store';
import {
  getFoAll,
  getFoLoading,
  LibraryState,
  selectFoById
} from '../../../../../../store/featureStates/library.feature';
import { Ifo } from '../../../../../../store/featureStates/fo/Ifo.interface';

describe('TabPciComponent', () => {
  let component: TabPciComponent;
  let fixture: ComponentFixture<TabPciComponent>;
  let mockStore: MockStore<LibraryState>;
  let listMock: MemoizedSelector<LibraryState, FO[]>;
  let loadingMock: MemoizedSelector<LibraryState, boolean>;
  let foMock: MemoizedSelectorWithProps<LibraryState, { id }, Ifo>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabPciComponent],
      providers: [provideMockStore()],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPciComponent);
    mockStore = TestBed.get(Store);

    const t: Ifo = {
      id: '0',
      FO_COLOR: '',
      FO_NAME: '',
      FO_STATUS: true,
      FO_MODE: 0,
      FO_FREQ: 0,
      FO_LI: 0,
      FO_PRI: 0,
      FO_RT: 0,
      FO_ATTEN: 0,
      FO_CLASS: 0,
      FO_MAX_TARGET: 0,
      FO_KILL_STATUS: 'true',
      FO_KILL: 0,
      FO_ALT_MIN: 0,
      FO_ALT_MAX: 0,
      FO_RAD_MIN: 0,
      FO_RAD_MAX: 0
    };

    listMock = mockStore.overrideSelector(getFoAll, []);
    loadingMock = mockStore.overrideSelector(getFoLoading, false);
    foMock = mockStore.overrideSelector(selectFoById, t);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

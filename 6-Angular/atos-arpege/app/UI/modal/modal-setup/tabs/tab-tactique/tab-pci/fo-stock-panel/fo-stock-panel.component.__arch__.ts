/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoStockPanelComponent } from './fo-stock-panel.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { getFoAll, getFoLoading, LibraryState } from '../../../../../../../store/featureStates/library.feature';


describe('FoStockPanelComponent', () => {
  let component: FoStockPanelComponent;
  let fixture: ComponentFixture<FoStockPanelComponent>;
  let mockStore: MockStore<LibraryState>;
  let listMock: MemoizedSelector<LibraryState, FO[]>;
  let loadingMock: MemoizedSelector<LibraryState, boolean>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      providers: [provideMockStore()],
      declarations: [FoStockPanelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoStockPanelComponent);
    mockStore = TestBed.get(Store);
    listMock = mockStore.overrideSelector(getFoAll, []);
    loadingMock = mockStore.overrideSelector(getFoLoading, false);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/

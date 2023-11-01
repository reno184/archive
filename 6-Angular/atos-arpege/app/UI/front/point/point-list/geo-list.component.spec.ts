import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoListComponent } from './geo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, MemoizedSelectorWithProps, Store } from '@ngrx/store';
import { GeoElementCommonModel } from '@arpege/models';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import * as reducerGeoElement from '../../../../store/featureStates/geo-element/geo-element.reducer';
import { AppInitService } from '../../../../app.init.service';


describe('GeoListComponent', () => {
  let component: GeoListComponent;
  let fixture: ComponentFixture<GeoListComponent>;

  let mockStore: MockStore<any>;
  let listMock: MemoizedSelectorWithProps<reducerGeoElement.GeoElementState, { type }, GeoElementCommonModel[]>;
  let loadingMock: MemoizedSelector<reducerGeoElement.GeoElementState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeoListComponent],
      providers: [provideMockStore(), {
        provide: AppInitService,
        useValue: { configDatas: { providers: { basic: '' } }, confFromServer: { MAP_URL: '' } }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    listMock = mockStore.overrideSelector(reducerGeoElement.selectByCategory, []);
    loadingMock = mockStore.overrideSelector(reducerGeoElement.selectLoading, false);
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
      fixture.debugElement.queryAll(By.css('.test-loading'))[0]
        .nativeElement
    ).toBeTruthy();
  });

  it('should display box open icon if no datas', () => {
    expect(
      fixture.debugElement.queryAll(By.css('.test-empty'))[0]
        .nativeElement
    ).toBeTruthy();
  });

  it('should display list items if datas array is not empty', () => {
    // todo utiliser ts-mockito
    // listMock.setResult([{ id: 'fdsfdf', 'marker-type': '0', 'leaflet-type': '0' }]);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.test-not-empty'))[0]
        .nativeElement
    ).toBeTruthy();
  });
});

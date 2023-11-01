import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PointFormComponent } from './point-form.component';
import { GeoElementCommonModel } from '@arpege/models';
import { MemoizedSelector, MemoizedSelectorWithProps, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormDirectivesModule } from '../../../../shared/directives/form-directives.module';
import { AppInitService } from '../../../../app.init.service';
import * as reducerGeoElement from '../../../../store/featureStates/geo-element/geo-element.reducer';
import { StaticDatas } from '../../../../labels.static';

describe('PointFormComponent', () => {
  let component: PointFormComponent;
  let fixture: ComponentFixture<PointFormComponent>;

  let mockStore: MockStore<any>;
  let pointMock: MemoizedSelectorWithProps<reducerGeoElement.GeoElementState, { params }, GeoElementCommonModel>;
  let submittingMock: MemoizedSelector<reducerGeoElement.GeoElementState, boolean>;

  // todo faire testunitaire route
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointFormComponent],
      providers: [provideMockStore(), StaticDatas, {
        provide: AppInitService,
        useValue: { configDatas: { providers: { basic: '' } }, confFromServer: { MAP_URL: '' } }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormDirectivesModule, ReactiveFormsModule, RouterTestingModule.withRoutes([])]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointFormComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    pointMock = mockStore.overrideSelector(reducerGeoElement.geoElementById, { params: { id: 'd' } });
    submittingMock = mockStore.overrideSelector(reducerGeoElement.selectSubmitting, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

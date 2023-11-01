import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IconOptions } from 'leaflet';
import { Store } from '@ngrx/store';
import * as frmFo from './store/featureStates/fo/fo.action';
import * as frmGeoElement from './store/featureStates/geo-element/geo-element.action';
import * as frmSetup from './store/featureStates/setup-mission/setup.action';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<any>;
  const options: IconOptions = {
    iconRetinaUrl: 'assets/images/marker-icon-2x.png',
    iconUrl: 'assets/images/marker-icon.png',
    shadowUrl: 'assets/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: {
            dispatch: jest.fn(),
            pipe: jest.fn()
          }
        }
      ],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    spyOn(component, 'overrideMarkerOption');
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  describe('onInit function ', () => {
    it('should called override Marker function', () => {
      expect(component.overrideMarkerOption).toHaveBeenCalledWith(options);
    });
    it('should dispatch 4 store actions', () => {
        expect(store.dispatch).toHaveBeenCalledTimes(4);
      }
    );
    it('should called ' + frmFo.LOAD_REQUEST, () => {
        expect(store.dispatch).toHaveBeenCalledWith(frmFo.LoadRequest());
      }
    );
    it('should called ' + frmGeoElement.LOAD_REQUEST, () => {
        expect(store.dispatch).toHaveBeenCalledWith(frmGeoElement.LoadRequest());
      }
    );
    it('should called ' + frmSetup.LOAD_REQUEST, () => {
        expect(store.dispatch).toHaveBeenCalledWith(frmSetup.LoadRequest());
      }
    );
  });

});

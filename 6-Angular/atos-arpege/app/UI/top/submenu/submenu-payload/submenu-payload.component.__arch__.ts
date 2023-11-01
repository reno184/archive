/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuPayloadComponent } from './submenu-payload.component';
import { SubmenuNetworkComponent } from '../submenu-network/submenu-network.component';
import { StateColorPipe } from '../../../../shared/pipes/state-color.pipe';
import { WifiPipe } from '../../../../shared/pipes/wifi.pipe';
import { StateTextPipe } from '../../../../shared/pipes/state-text.pipe';
import { MemoizedSelector, Store } from '@ngrx/store';
import {
  getPciArray,
  SceneState
} from '../../../../store/featureStates/SceneState/SceneReducer';
import { LatLng } from 'leaflet';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Pci } from '../../../../store/featureStates/SceneState/pci/pci.interface';
import { By } from '@angular/platform-browser';
import { AppInitService } from '../../../../app.init';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SubmenuPayloadComponent', () => {
  let component: SubmenuPayloadComponent;
  let fixture: ComponentFixture<SubmenuPayloadComponent>;

  let mockStore: MockStore<SceneState>;
  let pciMock: MemoizedSelector<SceneState, Pci[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SubmenuPayloadComponent,
        StateColorPipe,
        StateTextPipe
      ],
      providers: [provideMockStore(), AppInitService, {
        provide: AppInitService,
        useValue: { configFromServer: { USER_ROLE: '' } }
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuPayloadComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(Store);
    spyOn(component, 'getUser').and.returnValue('PPSRM');
    pciMock = mockStore.overrideSelector(getPciArray, [
      {
        id: 0,
        lib: 'PCI 1',
        coordinates: new LatLng(5.33935546875, 43.45790332088939),
        wifiDelay: 4,
        wifiError: false,
        wifiState: 'inherit',
        emission: true,
        type: 'A1',
        mode: 'A1'
      }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no data if pci array is empty', () => {
    pciMock.setResult([]);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('li'))[0].nativeElement
        .textContent
    ).toEqual('Pas de donnée...');
  });
});
*/

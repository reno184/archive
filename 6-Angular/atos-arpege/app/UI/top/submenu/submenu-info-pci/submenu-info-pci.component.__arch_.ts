/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuInfoPCIComponent } from './submenu-info-pci.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getLatlng, getPciArray, SceneState } from '../../../../store/featureStates/SceneState/SceneReducer';
import { Pci } from '../../../../store/featureStates/SceneState/pci/pci.interface';
import { LatLng } from 'leaflet';
import { LatlngFormaterPipe } from '../../../../shared/pipes/laltng-formatter.pipe';
import { By } from '@angular/platform-browser';
import { AppInitService } from '../../../../app.init';

describe('SubmenuInfoPCIComponent', () => {
  let component: SubmenuInfoPCIComponent;
  let fixture: ComponentFixture<SubmenuInfoPCIComponent>;
  let mockStore: MockStore<SceneState>;

  let pciMock: MemoizedSelector<SceneState, Pci[]>;
  let latLngMock: MemoizedSelector<SceneState, string>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmenuInfoPCIComponent, LatlngFormaterPipe],
      providers: [provideMockStore(), { provide: AppInitService, useValue: { configFromServer: { USER_ROLE: '' } } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuInfoPCIComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getUser').and.returnValue('PPSRM');
    mockStore = TestBed.get(Store);
    latLngMock = mockStore.overrideSelector(getLatlng, 'dd');
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

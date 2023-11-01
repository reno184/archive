/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import pciMockJon from '../../../../store/featureStates/SceneState/pci/test-pci-mock.json';
import { SubmenuMissionComponent } from './submenu-mission.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  getPciArray,
  SceneState,
  SelectMissionIsStart
} from '../../../../store/featureStates/SceneState/SceneReducer';
import { MemoizedSelector, Store } from '@ngrx/store';
import { Pci } from '../../../../store/featureStates/SceneState/pci/pci.interface';
import { LatLng } from 'leaflet';
import { MapToArrayPipe } from '../../../../shared/pipes/map-to-array.pipe';
import { By } from '@angular/platform-browser';
import { AppInitService } from '../../../../app.init';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SubmenuMissionComponent', () => {
  let component: SubmenuMissionComponent;
  let fixture: ComponentFixture<SubmenuMissionComponent>;

  let mockStore: MockStore<SceneState>;
  let pciArrayMock: MemoizedSelector<SceneState, Pci[]>;
  let isStartMock: MemoizedSelector<SceneState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubmenuMissionComponent, MapToArrayPipe],
      providers: [provideMockStore(), { provide: AppInitService, useValue: { configFromServer: { USER_ROLE: '' } }}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuMissionComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getUser').and.returnValue('PPSRM');
    mockStore = TestBed.get(Store);

    pciArrayMock = mockStore.overrideSelector(getPciArray, [
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
    isStartMock = mockStore.overrideSelector(SelectMissionIsStart, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no data if pci array is empty', () => {
    pciArrayMock.setResult([]);
    mockStore.refreshState();
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('li'))[0].nativeElement
        .textContent
    ).toEqual('Pas de donnée...');
  });
});
*/

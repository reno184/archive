/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuNetworkComponent } from './submenu-network.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getPciArray, SceneState } from '../../../../store/featureStates/SceneState/SceneReducer';
import { Pci } from '../../../../store/featureStates/SceneState/pci/pci.interface';
import { LatLng } from 'leaflet';
import { StateColorPipe } from '../../../../shared/pipes/state-color.pipe';
import { WifiPipe } from '../../../../shared/pipes/wifi.pipe';
import { By } from '@angular/platform-browser';
import { AppInitService } from '../../../../app.init';

describe('SubmenuNetworkComponent', () => {
    let component: SubmenuNetworkComponent;
    let fixture: ComponentFixture<SubmenuNetworkComponent>;

    let mockStore: MockStore<SceneState>;
    let pciMock: MemoizedSelector<SceneState, Pci[]>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubmenuNetworkComponent, StateColorPipe, WifiPipe],
            providers: [provideMockStore(), { provide: AppInitService, useValue: { configFromServer: { USER_ROLE: '' } } }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmenuNetworkComponent);
        component = fixture.componentInstance;
        spyOn(component, 'getUser').and.returnValue('PPSRM');
        mockStore = TestBed.get(Store);
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
                mode: 'A1',
            },
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
                .textContent,
        ).toEqual('Pas de donnée');
    });
});
*/

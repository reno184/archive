/*
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuPlaystopComponent } from './submenu-playstop.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import {
    getPciAllEmissionState,
    getPciAllNetworkState,
    getPciArray,
    SceneState,
} from '../../../../store/featureStates/SceneState/SceneReducer';
import { LatLng } from 'leaflet';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Pci } from '../../../../store/featureStates/SceneState/pci/pci.interface';
import { By } from '@angular/platform-browser';
import { AppInitService } from '../../../../app.init';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SubmenuPlaystopComponent', () => {
    let component: SubmenuPlaystopComponent;
    let fixture: ComponentFixture<SubmenuPlaystopComponent>;

    let mockStore: MockStore<SceneState>;
    let pciMock: MemoizedSelector<SceneState, Pci[]>;
    let allMock: MemoizedSelector<SceneState, boolean>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubmenuPlaystopComponent],
            providers: [
                provideMockStore(),
                { provide: AppInitService, useValue: { confFromServer: { USER_ROLE: '' } }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SubmenuPlaystopComponent);
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
                mode: 'A1',
            },
        ]);
        allMock = mockStore.overrideSelector(getPciAllEmissionState, false);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not have #emissionStopped if allEmissionStatus is false', () => {
        expect(
            fixture.debugElement.query(By.css('.js-emission-status')),
        ).toBeTruthy();
    });

    it('should have #emissionStopped if allEmissionStatus is true', () => {
        allMock.setResult(true);
        mockStore.refreshState();
        fixture.detectChanges();
        expect(
            fixture.debugElement.query(By.css('.js-emission-status')),
        ).not.toBeTruthy();
    });
});
*/

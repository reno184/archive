import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PciInfo } from '@arpege/models';
import { select, Store } from '@ngrx/store';
import labelData from './labelData.json';
import * as sceneReducer from '../../../../store/featureStates/SceneState/SceneReducer';
import * as pciAction from '../../../../store/featureStates/SceneState/pci/pci.action';
import { LabelPlayStop } from './labelData';
import { AppInitService } from '../../../../app.init.service';

@Component({
    selector: 'app-submenu-playstop',
    templateUrl: './submenu-playstop.component.html',
    styleUrls: ['./submenu-playstop.component.sass'],
})
export class SubmenuPlaystopComponent implements OnInit {
    labelPlaystop: LabelPlayStop = labelData;

    pciArray$: Observable<PciInfo[]> = this.store.pipe(
        select(sceneReducer.getPciArray),
    );
    allEmissionStatus$: Observable<boolean> = this.store.pipe(
        select(sceneReducer.getPciAllEmissionState),
    );

    constructor(
      public appInitService: AppInitService,
      private store: Store<sceneReducer.SceneState>
    ) {}

    ngOnInit() {}

    getUser(): string {
        return this.appInitService.confFromServer.USER_ROLE;
    }

    stopAll() {
        this.store.dispatch(pciAction.allStopEmission());
    }

    stopRow(id: number) {
        this.store.dispatch(pciAction.rowStopEmission({ id }));
    }
}

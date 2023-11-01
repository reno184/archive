import { Component, OnInit } from '@angular/core';
import * as sceneReducer from '../../../../store/featureStates/SceneState/SceneReducer';
import { select, Store } from '@ngrx/store';
import { getAll } from '../../../../store/featureStates/SceneState/pci/pci.action';
import { Observable } from 'rxjs';
import { PciInfo, PciStatusType } from '@arpege/models';
import { AppInitService } from '../../../../app.init.service';
import * as unitReducer from '../../../../store/featureStates/unit-setting/unit-setting.reducer';
import { StaticDatas } from '../../../../labels.static';
import { ConstantesService } from './constantes';

@Component({
  selector: 'app-submenu-info-pci',
  templateUrl: './submenu-info-pci.component.html',
  styleUrls: ['./submenu-info-pci.component.sass'],
  providers: [ConstantesService]
})
export class SubmenuInfoPCIComponent implements OnInit {
  index: number;
  pciStatusType = PciStatusType;
  unitAltitude$ = this.store.pipe(select(unitReducer.getAltitude));
  pciArray$: Observable<PciInfo[]> = this.store.pipe(select(sceneReducer.getPciArray));
  latlng$: Observable<string> = this.store.pipe(select(unitReducer.getLatlng));

  constructor(
    public appInitService: AppInitService,
    private store: Store<any>,
    public staticDatas: StaticDatas,
    public constantes: ConstantesService
  ) {
    this.index = 1;
  }

  ngOnInit() {
    this.store.dispatch(getAll());
  }

  tooglePCI(index: number) {
    this.index = index;
  }

  getUser(): string {
    return this.appInitService.confFromServer.USER_ROLE;
  }
}

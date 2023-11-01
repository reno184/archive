import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { select, Store } from '@ngrx/store';
import { JreCnxSt, JreRtcSt, JreSt, PciInfo, PciStatusType } from '@arpege/models';
import * as sceneReducer from '../../../../store/featureStates/SceneState/SceneReducer';
import { SceneState } from '../../../../store/featureStates/SceneState/SceneReducer';
import { getAll, getJre } from '../../../../store/featureStates/SceneState/pci/pci.action';

import { LabelInfo } from './labelData';
import labelData from './labelData.json';
import { AppInitService } from '../../../../app.init.service';
import { StaticDatas } from '../../../../labels.static';

@Component({
  selector: 'app-submenu-network',
  templateUrl: './submenu-network.component.html',
  styleUrls: ['./submenu-network.component.sass']
})
export class SubmenuNetworkComponent implements OnInit {
  index: number;
  labelInfo: LabelInfo = labelData;
  pciStatusType = PciStatusType;

  pciArray$: Observable<PciInfo[]> = this.store.pipe(select(sceneReducer.getPciArray));
  jreState$: Observable<JreSt> = this.store.pipe(select(sceneReducer.getJreNetworkState));

  constructor(
    public appInitService: AppInitService,
    private store: Store<SceneState>,
    public staticDatas: StaticDatas
  ) {
    this.index = 1;
  }

  ngOnInit() {
    this.store.dispatch(getAll());
    this.store.dispatch(getJre());
  }

  getUser(): string {
    return this.appInitService.confFromServer.USER_ROLE;
  }

  tooglePCI(index: number) {
    this.index = index;
  }

  getJreLinkName(status: JreCnxSt): string {
    let str: string;
    switch (status) {
      case  JreCnxSt.JRE_DISCONNECTED_GW :
        str = 'DISCONNECTED GW';
        break;
      case  JreCnxSt.JRE_ERROR :
        str = 'ERROR';
        break;
      case  JreCnxSt.JRE_DISCONNECTED :
        str = 'DISCONNECTED';
        break;
      case  JreCnxSt.JRE_PENDING :
        str = 'PENDING';
        break;
      case  JreCnxSt.JRE_CONNECTED :
        str = 'CONNECTED';
        break;
    }
    return str;
  }

  getJreRttName(status: JreRtcSt): string {
    let str: string;
    switch (status) {
      case  JreRtcSt.RTC_NO_STATEMENT :
        str = 'NO STATEMENT';
        break;
      case  JreRtcSt.RTC_LISTENING :
        str = 'LISTENING';
        break;
      case  JreRtcSt.RTC_ESTABLISHED :
        str = 'ESTABLISHED';
        break;
      case  JreRtcSt.RTC_FINAL :
        str = 'FINAL';
        break;
      case  JreRtcSt.RTC_FAILLED :
        str = 'FAILLED';
        break;
    }
    return str;
  }

  getStatusName(status: PciStatusType): string {
    let str: string;
    switch (status) {
      case  PciStatusType.DISCONNECTED :
        str = 'DISCONNECTED';
        break;
      case  PciStatusType.CONNECTED :
        str = 'CONNECTED';
    }
    return str;
  }

  getColorIcon(status: PciStatusType): string {
    let str: string;
    switch (status) {
      case  PciStatusType.DISCONNECTED :
        str = 'text-danger';
        break;
      case  PciStatusType.CONNECTED :
        str = 'text-success';
    }
    return str;
  }

  getTypeIcon(status: PciStatusType): string {
    let str: string;
    switch (status) {
      case  PciStatusType.DISCONNECTED :
        str = 'fa-wifi-1';
        break;
      case  PciStatusType.CONNECTED :
        str = 'fa-wifi';
    }
    return str;
  }
}

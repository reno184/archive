import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PciInfo } from '@arpege/models';
import { select, Store } from '@ngrx/store';
import { getPciArray, SceneState } from '../../../../store/featureStates/SceneState/SceneReducer';
import { allStart } from '../../../../store/featureStates/SceneState/pci/pci.action';


import { AppInitService } from '../../../../app.init.service';

@Component({
  selector: 'app-submenu-payload',
  templateUrl: './submenu-payload.component.html',
  styleUrls: ['./submenu-payload.component.sass']
})
export class SubmenuPayloadComponent implements OnInit {
  index: number;


  pciArray$: Observable<PciInfo[]> = this.store.pipe(select(getPciArray));

  constructor(
    public appInitService: AppInitService,
    private store: Store<SceneState>
  ) {
    this.index = 1;
  }

  getUser(): string {
    return this.appInitService.confFromServer.USER_ROLE;
  }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(allStart());
    }, 3000);
  }

  tooglePCI(index: number) {
    this.index = index;
  }

  getColorIcon(wifiState: string) {
    let str: string;
    switch (wifiState) {
      case  'pending' :
        str = 'text-warn';
        break;
      case  'inherit':
        str = 'text-dark';
        break;
      case  'error':
        str = 'text-danger';
        break;
      default:
        str = 'text-success';
    }
    return str;
  }

  getTextIcon(wifiState: string) {
    if (wifiState === 'pending') {
      return 'En cours...';
    } else if (wifiState === 'inherit') {
      return 'Non connecté';
    } else if (wifiState === 'error') {
      return 'Une erreur est survenue';
    } else {
      return 'Opérationnel';
    }
  }
}

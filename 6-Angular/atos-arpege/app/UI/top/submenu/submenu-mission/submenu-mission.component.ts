import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LabelComponentService } from './labels';
import { StaticDatas } from '../../../../labels.static';
import { getMission } from '../../../../store/featureStates/mission/mission.reducer';
import { StaticConfig } from '../../../../config.static';


@Component({
  selector: 'app-submenu-mission',
  templateUrl: './submenu-mission.component.html',
  providers: [LabelComponentService]
})
export class SubmenuMissionComponent implements OnInit {
  // accordeon menu pci index
  index: number;
  mission$ = this.store.pipe(select(getMission));

  /*  noPci$ = this.store.pipe(select(getNoPci));*/
  constructor(private store: Store<any>, public staticDatas: StaticDatas, public labels: LabelComponentService, public staticConfig: StaticConfig) {
    this.index = 0;
  }

  ngOnInit() {
  }

  tooglePCI(index: number) {
    this.index = index;
  }

  toggleState() {
  }
}

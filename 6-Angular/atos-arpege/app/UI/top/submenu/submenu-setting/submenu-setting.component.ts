import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as frmAction from 'src/app/store/featureStates/unit-setting/unit-setting.action';
import { SceneState } from '../../../../store/featureStates/SceneState/SceneReducer';
import { AppInitService } from '../../../../app.init.service';
import { StaticDatas } from '../../../../labels.static';

@Component({
  selector: 'app-submenu-setting',
  templateUrl: './submenu-setting.component.html'
})
export class SubmenuSettingComponent implements OnInit {

  constructor(private store: Store<SceneState>, public appInitService: AppInitService, public staticDatas: StaticDatas) {
  }

  onChangeDistance(distance) {
    this.store.dispatch(frmAction.changeDistance({ distance }));
  }

  onChangeLatLng(latlng) {
    this.store.dispatch(frmAction.changeLatLng({ latlng }));
  }

  onChangeAltitude(altitude) {
    this.store.dispatch(frmAction.changeAltitude({ altitude }));
  }

  onChangeSpeed(speed) {
    this.store.dispatch(frmAction.changeSpeed({ speed }));
  }

  onChangeDegrees(degree) {
    this.store.dispatch(frmAction.changeDegrees({ degree }));
  }

  onChangeCarte(carte) {
    this.store.dispatch(frmAction.changeCarte({ carte }));
  }

  ngOnInit() {

  }

  changeDistance(e) {
    e.preventDefault();
    this.onChangeDistance(e.currentTarget.value);
  }

  changeLatLng(e) {
    e.preventDefault();
    this.onChangeLatLng(e.currentTarget.value);
  }

  changeAltitude(e) {
    e.preventDefault();
    this.onChangeAltitude(e.currentTarget.value);
  }

  changeSpeed(e) {
    e.preventDefault();
    this.onChangeSpeed(e.currentTarget.value);
  }

  changeCarte(e) {
    e.preventDefault();
    this.onChangeCarte(e.currentTarget.value);
  }

  changeDegrees(e) {
    e.preventDefault();
    this.onChangeDegrees(e.currentTarget.value);
  }
}

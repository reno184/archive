import { Component, OnDestroy, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as frmFo from './store/featureStates/fo/fo.action';
import * as frmGeoElement from './store/featureStates/geo-element/geo-element.action';
import { icon, IconOptions, Marker } from 'leaflet';
import * as frmSetup from './store/featureStates/setup-mission/setup.action';
import * as actionTrack from './store/featureStates/track/track.action';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as pciInfoAction from './store/featureStates/pci-info/pci-info.action';
import { selectById } from './store/featureStates/setup-mission/setup.reducer';
import { cloneMission, onUpdateInfoPCI } from './store/featureStates/mission/mission.action';
import * as pciInfoReducer from './store/featureStates/pci-info/pci-info.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  msgError$ = this.store.pipe(select(state => state.err), filter(err => err.message));

  constructor(private store: Store<any>, private activatedRoute: ActivatedRoute) {

  }

  overrideMarkerOption(option: IconOptions): void {
    Marker.prototype.options.icon = icon(option);
  }

  ngOnInit() {

    this.sub1 = this.activatedRoute.queryParams.pipe(
      filter(x => x.mission),
      map(x => x.id),
      switchMap(id => this.store.pipe(select(selectById, { id }), first(result => result)))).subscribe((setup) => {
      this.store.dispatch(cloneMission({ setup }));
    });

    this.sub2 = this.store.pipe(select(pciInfoReducer.getEntities)).subscribe(entities => this.store.dispatch(onUpdateInfoPCI({ entities })));

    this.overrideMarkerOption({
      iconRetinaUrl: 'assets/images/marker-icon-2x.png',
      iconUrl: 'assets/images/marker-icon.png',
      shadowUrl: 'assets/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    this.store.dispatch(frmFo.LoadRequest());
    this.store.dispatch(frmGeoElement.LoadRequest());
    this.store.dispatch(frmSetup.LoadRequest());
    this.store.dispatch(actionTrack.openWebsocketChannel());
    this.store.dispatch(pciInfoAction.openWebsocketChannel());

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}

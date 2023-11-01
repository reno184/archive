import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { AppInitService } from '../../app.init.service';
import { LatLng } from 'leaflet';
import { select, Store } from '@ngrx/store';
import { getLatlng } from '../../store/featureStates/unit-setting/unit-setting.reducer';
import { MapInteractiveService } from '../../shared/services/map-interactive.service';
import { throttle } from 'rxjs/operators';
import { StaticDatas } from '../../labels.static';

@Component({
  selector: 'app-bar-bottom',
  templateUrl: './bar-bottom.component.html'
})
export class BarBottomComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  timer: Date;
  result$: Observable<LatLng>;

  latlngUnit$ = this.store.pipe(
    select(getLatlng)
  );

  constructor(public appInitService: AppInitService, private store: Store<any>, private mapService: MapInteractiveService, public staticDatas: StaticDatas) {
    this.result$ = this.mapService.mapMousePositionSubject.pipe(throttle(() => interval(1000)));
  }

  ngOnInit() {

    this.sub1 = interval(1000).subscribe(() => {
      this.timer = new Date();
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}

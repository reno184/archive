import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Control, layerGroup, LeafletMouseEvent, TileLayer } from 'leaflet';
import { AppInitService } from '../../app.init.service';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getDistance, getTypeCarte } from '../../store/featureStates/unit-setting/unit-setting.reducer';
import { MapInteractiveService } from '../../shared/services/map-interactive.service';
import * as reducerTrack from '../../store/featureStates/track/track.reducer';
import { filter, map } from 'rxjs/operators';
import { StaticDatas } from '../../labels.static';
import { StaticConfig } from '../../config.static';
import Scale = Control.Scale;

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.sass']
})
export class MainMapComponent implements OnInit, OnDestroy {
  showElevationPanel = false;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(public appInitService: AppInitService,
              private store: Store<any>,
              private staticDatas: StaticDatas,
              public staticConfig: StaticConfig,
              private mapInteractiveService: MapInteractiveService) {
  }

  ngOnInit() {

    const mapL = L.map('bigMap').setView(
      [this.staticConfig.default.view.lat, this.staticConfig.default.view.lng],
      this.staticConfig.default.view.zoom
    );

    mapL.on('mousemove', (x: LeafletMouseEvent) => {
      this.mapInteractiveService.mapMousePositionSubject.next(x.latlng);
    });

    this.mapInteractiveService.mainMap = mapL;


    let tileLayer: TileLayer;
    this.sub3 = this.store.pipe(select(getTypeCarte), filter(result => !!result), map(x => this.staticDatas.objects['type-carte'][x].val)).subscribe(type => {
      if (tileLayer) {
        tileLayer.remove();
      }
      const provider = this.appInitService.configDatas.providers;
      tileLayer = L.tileLayer(this.appInitService.confFromServer.MAP_URL + provider[type].url_part2 + provider[type].url_part3,
        { attribution: provider[type].attribution }).addTo(mapL);
    });

    let scale: Scale = L.control.scale().addTo(mapL);
    this.sub1 = this.store.select(getDistance).subscribe({
      next: value => {
        scale.remove();
        if (value === 'km') {
          scale = L.control.scale({ imperial: false, metric: true }).addTo(mapL);
        } else {
          scale = L.control.scale({ imperial: true, metric: false }).addTo(mapL);
        }
      }
    });
    const group = layerGroup([]).addTo(mapL);
    this.mapInteractiveService.mainGroup = group;
    this.sub2 = this.store.pipe(select(reducerTrack.getAll)).subscribe((result) => {
      group.clearLayers();
      result.forEach(elt => {
        if (elt.onScene) {
          this.mapInteractiveService.renderTrack(elt, group);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  windowWidth() {
    return window.innerWidth - 10;
  }
}




import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { GeoElementCommonModel } from '@arpege/models';
import * as frmGeoElement from '../../../../store/featureStates/geo-element/geo-element.reducer';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import * as L from 'leaflet';
import { layerGroup, LayerGroup } from 'leaflet';
import { getDistance } from '../../../../store/featureStates/unit-setting/unit-setting.reducer';
import { AppInitService } from '../../../../app.init.service';
import { MapInteractiveService } from '../../../../shared/services/map-interactive.service';

@Component({
  selector: 'app-geo-list',
  templateUrl: './geo-list.component.html',
  styleUrls: ['./geo-list.component.sass']
})
export class GeoListComponent implements OnInit, OnDestroy {

  sub4: Subscription;
  const;
  map: L.Map;
  group: LayerGroup;
  geoElements$ = this.activatedRoute.queryParams.pipe(
    mergeMap(params =>
      this.store.pipe(select(frmGeoElement.selectByCategory, { value: params['marker-type'] }))
    )
  );
  queryParams$ = this.activatedRoute.queryParams;
  loading$ = this.store.pipe(select(frmGeoElement.selectLoading));

  constructor(private store: Store<any>,
              private activatedRoute: ActivatedRoute,
              public appInitService: AppInitService,
              private mapInteractiveService: MapInteractiveService) {
    // constructor
  }

  ngOnInit() {
    this.map = L.map('map3', {
      center: [43.4856, 5.343],
      zoom: 8,
      closePopupOnClick: false
    });

    const providerBasic = this.appInitService.configDatas.providers.basic;
    const baseUrl = this.appInitService.confFromServer.MAP_URL;

    L.tileLayer(baseUrl + providerBasic.url_part2 + providerBasic.url_part3,
      { attribution: providerBasic.attribution }).addTo(this.map);

    let scale = L.control.scale().addTo(this.map);

    this.sub4 = this.store.select(getDistance).subscribe({
      next: value => {
        scale.remove();
        if (value === 'km') {
          scale = L.control.scale({ imperial: false, metric: true }).addTo(this.map);
        } else {
          scale = L.control.scale({ imperial: true, metric: false }).addTo(this.map);
        }
      }
    });
    this.group = layerGroup([]).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.sub4.unsubscribe();
  }

  renderLeafletSVG(geoElement: GeoElementCommonModel) {

    this.map.flyTo(
      { lat: geoElement['coordinate-point'].lat, lng: geoElement['coordinate-point'].lng }
    );

    // this.map.setView(geoElement['coordinate-point'],9);
    if (geoElement['marker-type'] === 'point') {
      this.mapInteractiveService.renderMarker(geoElement, this.group);
    } else {
      if (geoElement['leaflet-type'] === 'circle') {
        this.mapInteractiveService.renderCircle(geoElement, this.group);
      } else {
        this.mapInteractiveService.renderPolygone(geoElement, this.group);
      }
    }

  }

}

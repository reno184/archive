import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SetupFormService } from '../../../../../shared/services/setup-form.service';
import { merge, Observable, of, Subscription } from 'rxjs';
import { GeoElementCommonModel } from '@arpege/models';
import { select, Store } from '@ngrx/store';
import * as frmGeoElement from '../../../../../store/featureStates/geo-element/geo-element.reducer';
import { ActivatedRoute } from '@angular/router';
import ConfMap from './tab-zone-map.static.json';
import { TabZoneMapConfigInterface } from './tab-zone-map.static';
import * as L from 'leaflet';
import { MapInteractiveService } from '../../../../../shared/services/map-interactive.service';
import { mergeMap } from 'rxjs/operators';
import { AppInitService } from '../../../../../app.init.service';
import { getDistance } from '../../../../../store/featureStates/unit-setting/unit-setting.reducer';


@Component({
  selector: 'app-mission-poszone',
  templateUrl: './tab-zone.component.html',
  styleUrls: ['./tab-zone.component.sass']
})
export class MissionPoszoneComponent implements OnInit, OnDestroy {
  map: L.Map;
  group: L.LayerGroup;
  formGroup: FormGroup;
  confMap: TabZoneMapConfigInterface = ConfMap;
  attacheds$: Observable<GeoElementCommonModel[]>;
  sub4: Subscription;

  geoElements$ = this.activatedRoute.params.pipe(mergeMap(params => this.store.pipe(select(frmGeoElement.selectByCategory, { value: params.type }))));
  loading$ = this.store.pipe(select(frmGeoElement.selectLoading));
  params$ = this.activatedRoute.params;


  constructor(private setupFormService: SetupFormService,
              private store: Store<any>,
              public appInitService: AppInitService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private mapInteractiveService: MapInteractiveService
  ) {
    // constructor
  }


  ngOnInit() {
    this.formGroup = this.setupFormService.rootFormGroup();
    this.map = L.map(this.confMap.id, {
      center: [this.confMap.defaultLat, this.confMap.defaultLng],
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
    this.group = L.layerGroup([]).addTo(this.map);
    this.attacheds$ = merge(this.activatedRoute.params.pipe(() => of(this.formGroup.get('geo-attached').value)),
      this.formGroup.get('geo-attached').valueChanges).pipe(
      mergeMap(ids => this.store.pipe(select(frmGeoElement.selectByIds, { ids }))));

  }

  ngOnDestroy(): void {
    this.sub4.unsubscribe();
  }

  onAttachZone(id: string) {
    (this.formGroup.get('geo-attached') as FormArray).push(this.formBuilder.control(id));
  }

  onDetachZone(index) {
    (this.formGroup.get('geo-attached') as FormArray).removeAt(index);
  }

  renderLeafletSVG(geoElement: GeoElementCommonModel) {
    this.map.flyTo(
      { lat: geoElement['coordinate-point'].lat, lng: geoElement['coordinate-point'].lng }
    );
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

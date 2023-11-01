import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { MapInteractiveService } from '../../../../shared/services/map-interactive.service';
import * as L from 'leaflet';
import { LatLng, LayerGroup, LeafletMouseEvent } from 'leaflet';
import { AppInitService } from '../../../../app.init.service';
import * as turf from '@turf/turf';
import * as geoElementAction from '../../../../store/featureStates/geo-element/geo-element.action';
import * as geoElementReducer from '../../../../store/featureStates/geo-element/geo-element.reducer';
import { getDistance, getLatlng } from '../../../../store/featureStates/unit-setting/unit-setting.reducer';
import { StaticDatas } from '../../../../labels.static';


@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  providers: [StaticDatas]
  /* changeDetection: ChangeDetectionStrategy.OnPush*/
})
// todo empêcher l'enrw egistrement si coordonnées à zero

export class PointFormComponent implements OnInit, OnDestroy {
  disabledPolygone = false;
  disabledCircle = false;

  formGroup: FormGroup;
  // todo voir pour virer cette observable qui semble inutile
  submitting$ = this.store.pipe(select(geoElementReducer.selectSubmitting));
  sub4: Subscription;
  sub1: Subscription;
  group: LayerGroup;
  latlngUnit$ = this.store.pipe(select(getLatlng));
  params$ = this.activatedRoute.queryParams;
  map: L.Map;
  params: Params;
  sub2: Subscription;

  constructor(private store: Store<any>,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              public appInitService: AppInitService,
              public staticDatas: StaticDatas,
              private mapInteractiveService: MapInteractiveService, private router: Router) {
  }

  ngOnInit() {

    this.map = L.map('map4', {
      center: [43.4856, 5.343],
      zoom: 9,
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

    this.formGroup = this.formBuilder.group({
      id: '0',
      'marker-type': '',
      'marker-title': ['', Validators.required],
      'popover-icon': 'fa-ellipsis-h',
      'color-inner': '#1212dc',
      'color-border': '#1212dc',
      'circle-rayon': 0,
      'altitude-single': 0,
      'leaflet-type': '',
      'zone-opacity': 0,
      'altitude-range': this.formBuilder.group({
        start: 0,
        end: 0
      }),
      'coordinate-point': this.formBuilder.group({
        lat: [0, Validators.pattern(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/)],
        lng: [0, Validators.pattern(/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}/)]
      }),
      'coordinate-array': this.formBuilder.array([])
    });

    this.sub2 = this.store.select(geoElementReducer.getNewSetup).pipe(filter(x => !!x), take(1)).subscribe(id => {
      this.router.navigate(['/', { outlets: { front: ['front', 'geo', 'detail'] } }], {
        queryParams: { id },
        queryParamsHandling: 'merge'
      });
      this.store.dispatch(geoElementAction.idReset());
    });

    this.sub1 = this.activatedRoute.queryParams.pipe(
      tap((params) => {
        if (!params.id) {
          this.formGroup.patchValue({ 'marker-type': params['marker-type'] });
          if (params['marker-type'] === 'point') {
            this.formGroup.patchValue({
              'color-inner': 'disabled_validator',
              'color-border': 'disabled_validator'
            });
          } else {
            this.formGroup.patchValue({
              'popover-icon': 'disabled_validator'
            });
          }
        }
      }),
      filter(params => params.id),
      switchMap(params =>
        this.store.select(geoElementReducer.geoElementById, { params })
      ),
      filter(result => result)
    ).subscribe(geoElement => {
      if (geoElement['marker-type'] === 'point') {
        this.mapInteractiveService.renderMarker(geoElement, this.group);
      } else {
        if (geoElement['leaflet-type'] === 'circle') {
          this.mapInteractiveService.renderCircle(geoElement, this.group);
        } else {
          this.mapInteractiveService.renderPolygone(geoElement, this.group);
        }
      }
      this.formGroup.patchValue(geoElement);
    });
  }


  onSelectIcon($event: Event) {
    this.formGroup.patchValue({ 'popover-icon': $event });
  }

  onSubmit() {
    if (this.formGroup.get('id').value === '0') {
      this.store.dispatch(geoElementAction.POSTRequest({ body: this.formGroup.value }));
    } else {
      this.store.dispatch(geoElementAction.PUTRequest({
        body: this.formGroup.value,
        id: this.formGroup.get('id').value
      }));
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub4.unsubscribe();
    this.sub2.unsubscribe();
  }

  onDrawCircle() {
    if (this.disabledCircle) {
      return false;
    }
    this.disabledPolygone = true;
    this.disabledCircle = true;
    this.group.clearLayers();

    let circle: L.Circle;
    let circleRayon: number;
    const mouseMoveCircle = (e: LeafletMouseEvent) => {
      const initLatLng = circle.getLatLng();
      circleRayon = Math.round(turf.distance(turf.point([initLatLng.lng, initLatLng.lat]), turf.point([e.latlng.lng, e.latlng.lat]), {
        units: 'kilometers'
      }));
      circle.bindTooltip(`lat : ${initLatLng.lat}<br>lng: ${initLatLng.lng}<br>Rayon: ${circleRayon} km`).openTooltip();
      circle.setRadius(circleRayon * 1000);
      // this.rayonSubject.next(circleRayon);
      circle.redraw();
    };
    const startDrawCircle = (e: LeafletMouseEvent) => {

      this.map.removeEventListener('click', startDrawCircle);
      this.map.addEventListener('mousemove', mouseMoveCircle);
      this.map.addEventListener('click', stopDrawCircle);
      circle = L.circle(e.latlng, {
        radius: 2000,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: .2,
        weight: 1
      }).addTo(this.group);
      // this.latLngSubject.next(e.latlng);
    };
    const stopDrawCircle = () => {
      this.map.removeEventListener('click', stopDrawCircle);
      this.map.removeEventListener('mousemove', mouseMoveCircle);
      circle.unbindTooltip();
      circle.bindTooltip(`lat : ${circle.getLatLng().lat}<br>lng: ${circle.getLatLng().lng}<br>Rayon: ${circleRayon} km`).openTooltip();
      this.disabledPolygone = false;
      this.disabledCircle = false;
      this.formGroup.patchValue({
        'leaflet-type': 'circle',
        'coordinate-point': circle.getLatLng(),
        'circle-rayon': circleRayon
      });
    };
    this.map.addEventListener('click', startDrawCircle);

  }

  onDrawPolygone() {
    if (this.disabledPolygone) {
      return false;
    }
    this.disabledPolygone = true;
    this.disabledCircle = true;
    this.group.clearLayers();

    let polygon: L.Polygon;
    let closeCircle: L.Circle;

    const addSegmentPolygone = (e: LeafletMouseEvent) => {
      polygon.addLatLng(e.latlng);
    };

    const mouseMovePolygone = (e: LeafletMouseEvent) => {
      const coordArray: LatLng[] = polygon.getLatLngs()[0] as LatLng[];
      const lastLatLng = coordArray[coordArray.length - 1];
      const distanceKm = turf.distance(turf.point([lastLatLng.lng, lastLatLng.lat]), turf.point([e.latlng.lng, e.latlng.lat]), {
        units: 'kilometers'
      });
      polygon.bindTooltip(Math.round(distanceKm) + 'km').openTooltip([e.latlng.lat, e.latlng.lng]);
    };

    const stopDrawPolygone = () => {

      this.map.removeEventListener('mousemove', mouseMovePolygone);
      this.map.removeEventListener('click', addSegmentPolygone);
      polygon.unbindTooltip();
      closeCircle.removeEventListener('click', stopDrawPolygone);
      this.map.removeLayer(closeCircle);
      polygon.bindTooltip(`lat : ${polygon.getCenter().lat}<br>lng: ${polygon.getCenter().lng}`).openTooltip();
      this.disabledCircle = false;
      this.disabledPolygone = false;
      this.formGroup.get('coordinate-point').patchValue(polygon.getCenter());
      this.formGroup.get('leaflet-type').patchValue('polygone');
      const coords = this.formGroup.get('coordinate-array') as FormArray;
      coords.clear();
      // Prise en compte que le premier et unique polygone
      (polygon.getLatLngs()[0] as LatLng[]).map(item => {
        coords.push(this.formBuilder.control(item));
      });
      // this.formGroup.get('coordinate-array').reset(coords);
    };

    const startDrawPolygone = (e: LeafletMouseEvent) => {
      this.map.removeEventListener('click', startDrawPolygone);
      this.map.addEventListener('click', addSegmentPolygone);
      this.map.addEventListener('mousemove', mouseMovePolygone);
      closeCircle = L.circle(e.latlng, {
        radius: 5000,
        color: 'blue',
        weight: 1
      }).addTo(this.group);
      closeCircle.bindPopup('Cliquez ici pour fermer', {
        closeButton: false
      }).openPopup();
      polygon = L.polygon([e.latlng], { color: 'blue', weight: 1 }).addTo(this.group);
      closeCircle.addEventListener('click', stopDrawPolygone);
    };
    this.map.addEventListener('click', startDrawPolygone);
  }

  onDrawPoint() {
    const startDrawMarker = (e: LeafletMouseEvent) => {
      this.map.removeEventListener('click', startDrawMarker);
      this.group.clearLayers();
      const marker = L.marker(e.latlng, {
        draggable: true
      }).addTo(this.group);
      marker.bindTooltip(`lat: ${e.latlng.lat}<br>lng: ${e.latlng.lng}`, {
        permanent: true
      }).openTooltip();
      marker.on('drag', () => {
        marker.setTooltipContent(`lat: ${marker.getLatLng().lat}<br>lng: ${marker.getLatLng().lng}`);
        this.formGroup.get('coordinate-point').setValue(marker.getLatLng());
      });
      this.formGroup.get('coordinate-point').setValue(marker.getLatLng());
    };
    this.group.clearLayers();
    this.map.addEventListener('click', startDrawMarker);
  }

  onColorInnerPick($event: any) {
    this.formGroup.get('color-inner').setValue($event);
  }

  onColorBorderPick($event: any) {
    this.formGroup.get('color-border').setValue($event);
  }
}

import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, Marker } from 'leaflet';
import { TrackModel } from '../../store/featureStates/track/track.model';
import { BehaviorSubject } from 'rxjs';
import { AppInitService } from '../../app.init.service';
import { GeoElementCommonModel } from '@arpege/models';
import { StaticConfig } from '../../config.static';
import { StaticDatas } from '../../labels.static';

@Injectable({
  providedIn: 'root'
})
// todo  change mapInteractive service to mainMap service
export class MapInteractiveService {
  mainMap: L.Map;
  mainGroup: L.LayerGroup;


  mapMousePositionSubject = new BehaviorSubject<LatLng>(new LatLng(this.staticConfig.default.view.lat, this.staticConfig.default.view.lng));


  constructor(private appInitService: AppInitService, public staticConfig: StaticConfig, private staticDatas: StaticDatas) {
  }

  renderTrack(track: TrackModel, group: L.LayerGroup) {

    const identityImgPath = this.staticDatas.objects.trackIdentity[track.identity].imgPath;
    const typeImgPath = this.appInitService.configDatas.trackType[track.type].imgPath;
    const statusImgPath = this.appInitService.configDatas.trackActive[track.status].imgPath;
    const killImgPath = this.appInitService.configDatas.trackKill[track.kill].imgPath;

    const url = `assets/images/tracks/${typeImgPath}_${identityImgPath}_${statusImgPath}_${killImgPath}.png`;

    const t = L.divIcon({
      className: '???',
      iconAnchor: [17, 35],
      tooltipAnchor: [15, -15],
      html: `<img class="transform_center rotate_${track.course}" alt="${track.tn_ref}" src="${url}" style="width: 35px; height: 35px;"/>`
    });

    L.marker({ lat: track.position.lat, lng: track.position.lng }, { icon: t })
      .bindTooltip(`${track.tn_ref}`, { permanent: true })
      .addTo(group);
  }

  // todo voir pour mettre à jour avec l'unité de mesure
  // todo fair en sorte qu'il soit impossible d'enregistrer selement.coordinate-point
  renderMarker(element: GeoElementCommonModel, group: L.LayerGroup) {
    group.clearLayers();
    L.marker(element['coordinate-point'])
      .bindTooltip(`<i class="far ${element['popover-icon']}" style="margin-right: 5px" ></i>
            ${element['marker-title']}<br>lat : ${element['coordinate-point'].lat}
            <br>lng : ${element['coordinate-point'].lng}`, { permanent: true })
      .openTooltip().addTo(group);
  }

  renderPolygone(element: GeoElementCommonModel, group: L.LayerGroup) {
    group.clearLayers();
    if (element['coordinate-array'] && element['coordinate-array'].length > 2) {
      L.polygon(element['coordinate-array'], {
        color: element['color-border'],
        fillColor: element['color-inner'],
        fillOpacity: element['zone-opacity'],
        weight: 1
      }).bindTooltip(`${element['marker-title']}
            <br>lat : ${element['coordinate-point'].lat}
            <br>lng : ${element['coordinate-point'].lng}`, { permanent: true }).openTooltip().addTo(group);
    }
  }

  renderCircle(element: GeoElementCommonModel, group: L.LayerGroup) {
    group.clearLayers();

    L.circle([element['coordinate-point'].lat, element['coordinate-point'].lng], {
      radius: element['circle-rayon'] * 1000,
      color: element['color-border'],
      fillColor: element['color-inner'],
      fillOpacity: element['zone-opacity'],
      weight: 1
    }).bindTooltip(`${element['marker-title']}
            <br>lat : ${element['coordinate-point'].lat}
            <br>lng : ${element['coordinate-point'].lng}`, { permanent: true }).openTooltip().addTo(group);
  }

  fitBound() {
    const markersOnScene = [];
    this.mainGroup.getLayers().map(marker => {
      markersOnScene.push((marker as Marker).getLatLng());
    });
    if (markersOnScene.length > 0) {
      this.mainMap.fitBounds(markersOnScene, { maxZoom: 12, padding: L.point(50, 50) });
    }
  }

  flyTo(latlng) {
    this.mainMap.flyTo(latlng);
  }

}

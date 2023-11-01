import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as reducerUnit from '../../../store/featureStates/unit-setting/unit-setting.reducer';
import * as d3 from 'd3';
import { filter, map, mergeMap } from 'rxjs/operators';
import { StaticDatas } from '../../../labels.static';
import * as reducerTrack from '../../../store/featureStates/track/track.reducer';
import { MapInteractiveService } from '../../../shared/services/map-interactive.service';
import { LatLng } from 'leaflet';
import { TrackModel } from '../../../store/featureStates/track/track.model';

@Component({
  selector: 'app-elevation-scale',
  templateUrl: './panel-altitude.component.html',
  styleUrls: ['./panel-altitude.sass']
})
export class PanelAltitudeComponent implements OnInit, OnDestroy {
  isExpanded = false;
  yScale: any;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private store: Store<any>, private staticDatas: StaticDatas, private mapInteractiveService: MapInteractiveService) {
  }

  exitEnterTrack(datas: TrackModel[], unit, mainMap) {
    const line = d3.line();
    const paths = d3.select('#groupPistes').selectAll('path').data(datas);
    paths.exit().remove();
    paths.enter()
      .append('path')
      .attr('stroke', 'black');
    paths.merge(paths)
      .attr('d', (track) => {
        const positionPixelX = mainMap.latLngToLayerPoint(new LatLng(track.position.lat, track.position.lng)).x;
        return line([[positionPixelX, this.yScale(track.altitude * this.staticDatas.objects['unit-altitude'][unit].coef)], [positionPixelX, 150]]);
      });

    const circles = d3.select('#groupPistes').selectAll('circle').data(datas);
    circles.exit().remove();
    circles.enter().append('circle')
      .attr('stroke', 'black')
      .attr('r', 5);
    circles.merge(circles)
      .attr('fill', (track) => this.staticDatas.objects.trackIdentity[track.identity].color)
      .attr('cx', (track) => mainMap.latLngToLayerPoint(new LatLng(track.position.lat, track.position.lng)).x)
      .attr('cy', (track) => this.yScale(track.altitude * this.staticDatas.objects['unit-altitude'][unit].coef));

    const texts = d3.select('#groupPistes').selectAll('text').data(datas);
    texts.exit().remove();
    texts.enter().append('text')
      .attr('font-size', 12)
      .text(track => Math.floor(track.altitude * this.staticDatas.objects['unit-altitude'][unit].coef))
      .attr('x', (track) => mainMap.latLngToLayerPoint(new LatLng(track.position.lat, track.position.lng)).x + 10)
      .attr('y', (track) => this.yScale(track.altitude * this.staticDatas.objects['unit-altitude'][unit].coef));
    texts.merge(texts)
      .attr('x', (track) => mainMap.latLngToLayerPoint(new LatLng(track.position.lat, track.position.lng)).x + 10)
      .attr('y', (track) => this.yScale(track.altitude * this.staticDatas.objects['unit-altitude'][unit].coef));
  }

  ngOnInit() {
    this.sub1 = this.store.pipe(select(reducerTrack.getMaxAltitude), filter(result => result !== -Infinity), mergeMap(altitude => {
      return this.store.pipe(select(reducerUnit.getAltitude)).pipe(map(unit => {
        return { unit, altitude };
      }));
    })).subscribe(obj => {
      const maxAltitude = Math.floor(obj.altitude * this.staticDatas.objects['unit-altitude'][obj.unit].coef);
      this.yScale = d3.scaleLinear().domain([0, maxAltitude]).range([140, 0]);
      d3.select('#groupYAxisLeft').call(d3.axisLeft(this.yScale));
      d3.select('#groupYAxisRight').call(d3.axisRight(this.yScale));
      d3.select('#groupLines').selectAll('line')
        .data(this.yScale.ticks())
        .enter()
        .append('line')
        .attr('stroke', 'rgba(204,204,204,.3)')
        .attr('x1', 50)
        .attr('y1', d => this.yScale(d))
        .attr('x2', (window.innerWidth - 50))
        .attr('y2', d => this.yScale(d));
    });

    this.sub3 = this.store.pipe(select(reducerTrack.getTrackOnScene), mergeMap(tracks => {
      return this.store.pipe(select(reducerUnit.getAltitude)).pipe(map(unit => {
        return { unit, tracks };
      }));
    }))
      .subscribe((result => {
          this.exitEnterTrack(result.tracks, result.unit, this.mapInteractiveService.mainMap);
        })
      );
    this.sub2 = fromEvent(this.mapInteractiveService.mainMap, 'move').subscribe((() => {
        const topLeft = this.mapInteractiveService.mainMap.latLngToLayerPoint(this.mapInteractiveService.mainMap.getBounds().getNorthWest());
        const selection = d3.select('#groupPistes');
        selection.attr('transform', `translate(${(Math.floor(topLeft.x)) * -1},10)`);
      })
    );
  }

  onToggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}

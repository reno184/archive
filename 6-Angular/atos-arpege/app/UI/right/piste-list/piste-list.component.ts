import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as reducerTrack from '../../../store/featureStates/track/track.reducer';
import { TrackModel } from '../../../store/featureStates/track/track.model';
import { MapInteractiveService } from '../../../shared/services/map-interactive.service';
import { LatLng } from 'leaflet';
import { StaticDatas } from '../../../labels.static';
import * as reducerUnit from '../../../store/featureStates/unit-setting/unit-setting.reducer';
import { Update } from '@ngrx/entity';
import { filter, switchMap, take } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import * as actionTrack from '../../../store/featureStates/track/track.action';

@Component({
  selector: 'app-piste-list',
  templateUrl: './piste-list.component.html'
})
export class PisteListComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;
  subj1 = new Subject<boolean>();
  obs1$: Observable<TrackModel[]>;
  toggleAll = true;
  trackList$ = this.store.pipe(select(reducerTrack.getAll));
  unitSpeed$ = this.store.pipe(select(reducerUnit.getSpeed));
  unitDegree$ = this.store.pipe(select(reducerUnit.getDegrees));
  unitAltitude$ = this.store.pipe(select(reducerUnit.getAltitude));
  unitLatLng$ = this.store.pipe(select(reducerUnit.getLatlng));

  constructor(private store: Store<any>, private mapInteractiveService: MapInteractiveService, public staticDatas: StaticDatas) {
  }

  ngOnInit() {
    this.obs1$ = this.store.select(reducerTrack.getAll).pipe(filter(result => result.length > 0), take(1));
    this.sub1 = this.subj1.pipe(switchMap(() => this.obs1$)).subscribe((result) => {
      const tracksUpdate: Update<TrackModel>[] = result.map(item => {
        return {
          id: item.tn_id,
          changes: {
            onScene: this.toggleAll
          }
        };
      });

      this.store.dispatch(actionTrack.toggleAllTrack({ tracksUpdate }));
      this.mapInteractiveService.fitBound();
    });
    this.sub2 = this.obs1$.subscribe(() => this.mapInteractiveService.fitBound());
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  onAddScene(track: TrackModel) {
    this.mapInteractiveService.flyTo({ lat: track.position.lat, lng: track.position.lng } as LatLng);
    const trackModified: Update<TrackModel> = {
      id: track.tn_id,
      changes: { onScene: true }
    };
    this.store.dispatch(actionTrack.updateTrack({ trackModified }));
  }

  onRemoveScene(track: TrackModel) {
    const trackModified: Update<TrackModel> = {
      id: track.tn_id,
      changes: { onScene: false }
    };
    this.store.dispatch(actionTrack.updateTrack({ trackModified }));
  }

  onSelect(track: TrackModel) {
    this.mapInteractiveService.flyTo({ lat: track.position.lat, lng: track.position.lng } as LatLng);
  }

  onToggleAll() {
    this.toggleAll = !this.toggleAll;
    this.subj1.next(this.toggleAll);
  }

  onChangeIdentity(id, e) {
    this.store.dispatch(actionTrack.changeIdentityAPI({ id, value: e.currentTarget.value }));
  }

  onKill(id) {
    this.store.dispatch(actionTrack.killAPI({ id }));
  }

  onToggleActive(id: number, val: number) {
    this.store.dispatch(actionTrack.trackActiveAPI({ id, val }));
  }
}

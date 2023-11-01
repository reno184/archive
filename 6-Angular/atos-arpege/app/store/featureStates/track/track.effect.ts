import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, throttleTime } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actionApp from '../../app/app.actions';
import { ADD_ERROR } from '../../app/app.actions';
import * as actionTrack from './track.action';
import { TrackService } from './track.service';

@Injectable()
export class TrackEffect {
  @Effect()
  loadTrack$ = this.actions$.pipe(
    ofType(actionTrack.LOAD_REQUEST),
    switchMap(() => {
        return this.service.getAll().pipe(
          map(items => ({ type: actionTrack.LOAD_SUCCESS, items })),
          catchError(err => of({ type: actionApp.ADD_ERROR, err }))
        );
      }
    )
  );

  /*  @Effect()
    trackIDENTIY$ = this.actions$.pipe(
      ofType(actionTrack.CHANGE_IDENTITY_API,
      switchMap(({  id , value }) => {
        return this.service.changeIdentity( id, value).pipe(
          map(data => ({ type: GeoElementAction.PUT_SUCCESS, item: data })),
          catchError(err => of({ type: ADD_ERROR, err }))
        );
      })
    );*/

  @Effect()
  kill$ = this.actions$.pipe(
    ofType(actionTrack.KILL_API),
    throttleTime(2000),
    switchMap(({ id }) => {
      return this.service.kill(id).pipe(
        map(() => ({ type: actionTrack.KILL_SUCCESS })),
        catchError(err => of({ type: ADD_ERROR, err }))
      );
    })
  );

  @Effect()
  active$ = this.actions$.pipe(
    ofType(actionTrack.TRACK_ACTIVE_API),
    throttleTime(2000),
    switchMap(({ id, val }) => {
      return this.service.toggleActive(id, val).pipe(
        map(() => ({ type: actionTrack.TRACK_ACTIVE_SUCCESS })),
        catchError(err => of({ type: ADD_ERROR, err }))
      );
    })
  );

  constructor(private actions$: Actions, private service: TrackService) {
  }
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ADD_ERROR } from '../../app/app.actions';
import * as GeoElementAction from './geo-element.action';
import { GeoElementService } from './geo-element.service';


@Injectable()
export class GeoElementEffect {
  @Effect()
  geoElementGET$ = this.actions$.pipe(
    ofType(GeoElementAction.LOAD_REQUEST),
    switchMap(() =>
      this.service.getAll().pipe(
        map(items => ({ type: GeoElementAction.LOAD_SUCCESS, items })),
        catchError(err => of({ type: ADD_ERROR, err }))
      )
    )
  );

  @Effect()
  geoElementPOST$ = this.actions$.pipe(
    ofType(GeoElementAction.POST_REQUEST),
    switchMap(({ body }) => {
      return this.service.post(body).pipe(
        map(data => ({ type: GeoElementAction.POST_SUCCESS, item: data })),
        catchError(err => of({ type: ADD_ERROR, err }))
      )
        ;
    })
  );

  @Effect()
  geoElementPUT$ = this.actions$.pipe(
    ofType(GeoElementAction.PUT_REQUEST),
    switchMap(({ body, id }) => {
      return this.service.put(body, id).pipe(
        map(data => ({ type: GeoElementAction.PUT_SUCCESS, item: data })),
        catchError(err => of({ type: ADD_ERROR, err }))
      );
    })
  );

  constructor(private actions$: Actions, private service: GeoElementService) {
  }
}

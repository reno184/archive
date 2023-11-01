import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ADD_ERROR } from '../../app/app.actions';
import { LOAD_REQUEST, LOAD_SUCCESS, POST_REQUEST, POST_SUCCESS, PUT_REQUEST, PUT_SUCCESS } from './fo.action';
import { FoService } from './fo.service';


@Injectable()
export class FoEffect {
  @Effect()
  foGET$ = this.actions$.pipe(
    ofType(LOAD_REQUEST),
    mergeMap(() =>
      this.service.getAll().pipe(
        map(items => ({ type: LOAD_SUCCESS, items })),
        catchError(err => of({ type: ADD_ERROR, err }))
      )
    )
  );

  @Effect()
  foPOST$ = this.actions$.pipe(
    ofType(POST_REQUEST),
    mergeMap(({ body }) => {
      return this.service.post(body).pipe(
        map((data) => ({ type: POST_SUCCESS, item: data })),
        catchError(err => of({ type: ADD_ERROR, err }))
      );
    })
  );

  @Effect()
  foPUT$ = this.actions$.pipe(
    ofType(PUT_REQUEST),
    mergeMap(({ body, id }) => {
      return this.service.put(body, id).pipe(
        delay(1700),
        map(data => ({ type: PUT_SUCCESS, item: data })),
        catchError(err => of({ type: ADD_ERROR, err }))
      );
    })
  );

  constructor(private actions$: Actions, private service: FoService) {
  }
}

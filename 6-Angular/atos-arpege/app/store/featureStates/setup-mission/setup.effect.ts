import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SetupService } from './setup.service';
import { LOAD_REQUEST, LOAD_SUCCESS, POST_REQUEST, POST_SUCCESS, PUT_REQUEST, PUT_SUCCESS } from './setup.action';
import { ADD_ERROR } from '../../app/app.actions';
import { MissionSetupModel } from '@arpege/models';

@Injectable()
export class SetupEffect {
  @Effect()
  setupGET$ = this.actions$.pipe(
    ofType(LOAD_REQUEST),
    mergeMap(() =>
      this.service.getAll().pipe(
        map(items => ({ type: LOAD_SUCCESS, items })),
        catchError(err => of({ type: ADD_ERROR, err }))
      )
    )
  );

  @Effect()
  setupPOST$ = this.actions$.pipe(
    ofType(POST_REQUEST),
    mergeMap(({ body }) => {
      return this.service.post(body).pipe(
        map((data: MissionSetupModel) => ({ type: POST_SUCCESS, item: data })),
        catchError(err => of({ type: ADD_ERROR, err }))
      );
    })
  );

  @Effect()
  setupPUT$ = this.actions$.pipe(
    ofType(PUT_REQUEST),
    mergeMap(({ body, id }) => {
      return this.service.put(body, id).pipe(
        map(data => ({ type: PUT_SUCCESS, item: data })),
        catchError(err => of({ type: ADD_ERROR, err }))
      );
    })
  );


  constructor(private actions$: Actions, private service: SetupService) {
  }
}

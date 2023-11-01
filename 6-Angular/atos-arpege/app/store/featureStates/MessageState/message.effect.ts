import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MessageService } from './message.service';
import * as frmAction from './message.action';
import { LOAD_SUCCESS } from './message.action';
import { ADD_ERROR } from '../../app/app.actions';

@Injectable()
export class MessageEffects {
    @Effect()
    loadMessage$ = this.actions$.pipe(
        ofType(frmAction.LOAD_REQUEST),
        mergeMap(() =>
            this.service.getAll().pipe(
              map(items => ({ type: LOAD_SUCCESS, items })),
              catchError(err => of({ type: ADD_ERROR, err }))
            ),
        ),
    );

    constructor(private actions$: Actions, private service: MessageService) {}
}

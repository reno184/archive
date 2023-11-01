import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PCIService } from './pci.service';
import * as frmAction from './pci.action';
import { GET_ALL_SUCCESS, GET_JRE_SUCCESS } from './pci.action';
import { ADD_ERROR } from '../../../app/app.actions';

@Injectable()
export class PciEffects {
    // todo depreciated
    @Effect()
    loadPCI$ = this.actions$.pipe(
        ofType(frmAction.GET_ALL),
        mergeMap(() =>
            this.service.getAll().pipe(
                map(pciArray => ({ type: GET_ALL_SUCCESS, pciArray })),
                catchError(err => of({ type: ADD_ERROR, err }))
            ),
        ),
    );

    @Effect()
    loadJRE$ = this.actions$.pipe(
        ofType(frmAction.GET_JRE),
        mergeMap(() =>
            this.service.getJre().pipe(
                map(jrest => ({ type: GET_JRE_SUCCESS, jrest })),
                catchError(err => of({ type: ADD_ERROR, err }))
            ),
        ),
    );
    constructor(private actions$: Actions, private service: PCIService) { }
}

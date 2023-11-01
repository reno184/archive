import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InfoPCIService } from './pci-info.service';
import * as infoPciAction from './pci-info.action';
import * as appAction from '../../app/app.actions';
import { PciInfo } from '@arpege/models';

@Injectable()
export class PciInfoEffects {
  @Effect()
  InfoPCIChannel$ = this.actions$.pipe(
    ofType(infoPciAction.OPEN_CHANNEL),
    mergeMap(() =>
      this.service.openChannel().pipe(
        map((items: PciInfo[]) => {
          /* if (items.length > 0) {*/
          return ({ type: infoPciAction.CHANNEL_OPENED, items });
          /* } else {
             return ({ type: infoPciAction.CHANNEL_NOT_OPENED });
           }*/
        }),
        catchError(err => of({ type: appAction.ADD_ERROR, err }))
      )
    )
  );

  constructor(private actions$: Actions, private service: InfoPCIService) {
  }
}

import {Injectable} from "@angular/core";
import {mergeMap} from "rxjs/operators";
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as action_carousel from "./carousel.action";
import {AppService} from "../service/app.service";
import {CarouselService} from "../service/carousel.service";

@Injectable()
export class CarouselEffects {

    @Effect()
    LOAD_CAROUSEL$ = this.actions$.pipe(
        ofType(action_carousel.LOAD_REQUEST),
        mergeMap(() => {
                return this.carouselService.getList().then(items => ({type: action_carousel.LOAD_SUCCESS, items}))
            }
        )
    );

    /*  @Effect()
      CREATE_CAROUSEL$ = this.actions$.pipe(
          ofType(action_carousel.ADD_REQUEST),
          mergeMap(({obj}) =>
              this.appService.add('image', obj).pipe(
                  timeout(10000),
                  map((item) => ({type: action_carousel.ADD_SUCCESS, item})),
                  catchError(err => of({type: rootAction.SHOW_ERROR, err}))
              )
          )
      );

      @Effect()
      DELETE_CAROUSEL$ = this.actions$.pipe(
          ofType(action_carousel.DELETE_REQUEST),
          mergeMap(({id}) =>
              this.appService.delete('image', id).pipe(
                  timeout(10000),
                  map(() => ({type: action_carousel.DELETE_SUCCESS, id})),
                  catchError(err => of({type: rootAction.SHOW_ERROR, err}))
              )
          )
      );*/

    constructor(private actions$: Actions, private appService: AppService, private carouselService: CarouselService) {
    }
}

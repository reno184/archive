import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, timeout} from "rxjs/operators";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from "rxjs";
import * as rootAction from "./root.action";
import * as carouselAction from "./lesson.action";
import * as action from "./lesson.action";
import {AppService} from "../service/app.service";

@Injectable()
export class LessonEffects {

    @Effect()
    LOAD_LESSON$ = this.actions$.pipe(
        ofType(carouselAction.LOAD_REQUEST),
        mergeMap(() =>
            this.appService.list('lesson').pipe(
                timeout(10000),
                map((items) => ({type: carouselAction.LOAD_SUCCESS, items})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    CREATE_LESSON$ = this.actions$.pipe(
        ofType(carouselAction.ADD_REQUEST),
        mergeMap(({obj}) =>
            this.appService.add('lesson', obj).pipe(
                timeout(10000),
                map((item) => ({type: carouselAction.ADD_SUCCESS, item})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    UPDATE_LESSON$ = this.actions$.pipe(
        ofType(action.UPDATE_REQUEST),
        mergeMap(({id, obj}) =>
            this.appService.update('lesson', id, obj).pipe(
                timeout(10000),
                map(() => ({type: action.UPDATE_SUCCESS, id, obj})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    DELETE_LESSON$ = this.actions$.pipe(
        ofType(carouselAction.DELETE_REQUEST),
        mergeMap(({id}) =>
            this.appService.delete('lesson', id).pipe(
                timeout(10000),
                map(() => ({type: carouselAction.DELETE_SUCCESS, id})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    SAVE_SORTING_LESSON$ = this.actions$.pipe(
        ofType(carouselAction.RANK_REQUEST),
        mergeMap(({list}) =>
            this.appService.sort('lesson', list).pipe(
                timeout(10000),
                map(() => ({type: carouselAction.RANK_SUCCESS})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    constructor(private actions$: Actions, private appService: AppService) {
    }
}

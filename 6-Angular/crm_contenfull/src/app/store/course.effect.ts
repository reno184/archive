import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, timeout} from "rxjs/operators";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from "rxjs";
import * as action from "./course.action";
import * as rootAction from "./root.action";
import {AppService} from "../service/app.service";

@Injectable()
export class CourseEffects {

    @Effect()
    LOAD_COURSE_LIST$ = this.actions$.pipe(
        ofType(action.LOAD_REQUEST),
        mergeMap(() =>
            this.service.list('course').pipe(
                timeout(10000),
                map((items) => ({type: action.LOAD_SUCCESS, items})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    CREATE_COURSE$ = this.actions$.pipe(
        ofType(action.ADD_REQUEST),
        mergeMap(({obj}) =>
            this.service.add('course', obj).pipe(
                timeout(10000),
                map((item) => ({type: action.ADD_SUCCESS, item})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );


    @Effect()
    DELETE_COURSE$ = this.actions$.pipe(
        ofType(action.DELETE_REQUEST),
        mergeMap(({id}) =>
            this.service.delete('course', id).pipe(
                timeout(10000),
                map(() => ({type: action.DELETE_SUCCESS, id})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    UPDATE_COURSE$ = this.actions$.pipe(
        ofType(action.UPDATE_REQUEST),
        mergeMap(({id, obj}) =>
            this.service.update('course', id, obj).pipe(
                timeout(10000),
                map(() => ({type: action.UPDATE_SUCCESS, id, obj})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );


    constructor(private actions$: Actions, private service: AppService) {
    }
}

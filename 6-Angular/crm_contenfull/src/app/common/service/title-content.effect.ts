import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, timeout} from "rxjs/operators";
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from "rxjs";
import * as titleContentAction from "./title-content.action";
import {QuiterieService} from "./quiterie.service";
import * as rootAction from "../../store/root.action";
import {TITLECONTENT} from "../constante";

@Injectable()
export class TitleContentEffects {

    @Effect()
    LOAD_TITLECONTENT$ = this.actions$.pipe(
        ofType(titleContentAction.LOAD_REQUEST),
        mergeMap(() =>
            this.quiterieService.list(TITLECONTENT).pipe(
                timeout(10000),
                map((items) => ({type: titleContentAction.LOAD_SUCCESS, items})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    CREATE_TITLECONTENT$ = this.actions$.pipe(
        ofType(titleContentAction.ADD_REQUEST),
        mergeMap(({obj}) =>
            this.quiterieService.add(TITLECONTENT, obj).pipe(
                timeout(10000),
                map((item) => ({type: titleContentAction.ADD_SUCCESS, item})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );


    @Effect()
    DELETE_TITLECONTENT$ = this.actions$.pipe(
        ofType(titleContentAction.DELETE_REQUEST),
        mergeMap(({id}) =>
            this.quiterieService.delete(TITLECONTENT, id).pipe(
                timeout(10000),
                map(() => ({type: titleContentAction.DELETE_SUCCESS, id})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    SAVE_SORTING_TITLECONTENT$ = this.actions$.pipe(
        ofType(titleContentAction.RANK_REQUEST),
        mergeMap(({list}) =>
            this.quiterieService.sort(TITLECONTENT, list).pipe(
                timeout(10000),
                map(() => ({type: titleContentAction.RANK_SUCCESS})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    @Effect()
    UPDATE_TITLECONTENT$ = this.actions$.pipe(
        ofType(titleContentAction.UPDATE_REQUEST),
        mergeMap(({id, obj}) =>
            this.quiterieService.update(TITLECONTENT, id, obj).pipe(
                timeout(10000),
                map(() => ({type: titleContentAction.UPDATE_SUCCESS, id, obj})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );



    constructor(private actions$: Actions, private quiterieService: QuiterieService) {
    }
}

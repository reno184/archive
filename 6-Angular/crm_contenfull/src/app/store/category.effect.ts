import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import * as action from "./category.action";
import {catchError, map, mergeMap, timeout} from "rxjs/operators";
import {of} from "rxjs";
import * as rootAction from "./root.action";
import {AppService} from "../service/app.service";

@Injectable()
export class CategoryEffects {

    @Effect()
    LOAD_CATEGORY_LIST$ = this.actions$.pipe(
        ofType(action.LOAD_REQUEST),
        mergeMap(() =>
            this.service.list('category').pipe(
                timeout(10000),
                map((items) => ({type: action.LOAD_SUCCESS, items})),
                catchError(err => of({type: rootAction.SHOW_ERROR, err}))
            )
        )
    );

    constructor(private actions$: Actions, private service: AppService) {
    }
}

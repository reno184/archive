import {createAction, props} from "@ngrx/store";
import {Category} from "../model/features/Category";

export const LOAD_REQUEST = '[API- CATEGORY] LOAD_REQUEST';
export const load_request = createAction(LOAD_REQUEST);
export const LOAD_SUCCESS = '[API- CATEGORY] LOAD_SUCCESS';
export const load_success = createAction(LOAD_SUCCESS, props<{ items: Category[] }>());

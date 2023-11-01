import {createAction, props} from "@ngrx/store";
import {Course} from "../model/features/Course";

export const LOAD_REQUEST = `[API - COURSE] LOAD_REQUEST`
export const load_request = createAction(LOAD_REQUEST);
export const LOAD_SUCCESS = `[API - COURSE] LOAD_SUCCESS`
export const load_success = createAction(LOAD_SUCCESS, props<{ items: Course[] }>());

export const ADD_REQUEST = `[API - COURSE] CREATE_REQUEST`
export const add_request = createAction(ADD_REQUEST, props<{ obj: Course }>());
export const ADD_SUCCESS = `[API - COURSE] CREATE_SUCCESS`
export const add_success = createAction(ADD_SUCCESS, props<{ item: Course }>());

export const UPDATE_REQUEST = `[API - COURSE] UPDATE_REQUEST`
export const update_request = createAction(UPDATE_REQUEST, props<{ id: string, obj: Course }>());
export const UPDATE_SUCCESS = `[API - COURSE] UPDATE_SUCCESS`
export const update_success = createAction(UPDATE_SUCCESS, props<{ id: string, obj: Course }>());

export const DELETE_REQUEST = '[API - COURSE] DELETE_REQUEST';
export const delete_request = createAction(DELETE_REQUEST, props<{ id: string }>());
export const DELETE_SUCCESS = '[API - COURSE] DELETE_SUCCESS';
export const delete_success = createAction(DELETE_SUCCESS, props<{ id: string }>());

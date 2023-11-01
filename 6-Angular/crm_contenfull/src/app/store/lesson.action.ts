import {createAction, props} from "@ngrx/store";
import {Update} from "@ngrx/entity";
import {Lesson} from './lesson.model';

export const LOAD_REQUEST = '[API-LESSON] LOAD_REQUEST';
export const load_request = createAction(LOAD_REQUEST);
export const LOAD_SUCCESS = '[API-LESSON] LOAD_SUCCESS';
export const load_success = createAction(LOAD_SUCCESS, props<{ items: Lesson[] }>());

export const ADD_REQUEST = '[API-LESSON] CREATE_REQUEST';
export const add_request = createAction(ADD_REQUEST, props<{ obj: Lesson }>());
export const ADD_SUCCESS = '[API-LESSON] CREATE_SUCCESS';
export const add_success = createAction(ADD_SUCCESS, props<{ item: Lesson }>());

export const UPDATE_REQUEST = `[API-LESSON] UPDATE_REQUEST`
export const update_request = createAction(UPDATE_REQUEST, props<{ id: string, obj: Lesson }>());
export const UPDATE_SUCCESS = `[API-LESSON] UPDATE_SUCCESS`
export const update_success = createAction(UPDATE_SUCCESS, props<{ id: string, obj: Lesson }>());

export const DELETE_REQUEST = '[API-LESSON] DELETE_REQUEST';
export const delete_request = createAction(DELETE_REQUEST, props<{ id: string }>());
export const DELETE_SUCCESS = '[API-LESSON] DELETE_SUCCESS';
export const delete_success = createAction(DELETE_SUCCESS, props<{ id: string }>());

export const RANK_REQUEST = '[API-LESSON] RANK_REQUEST';
export const rank_request = createAction(RANK_REQUEST, props<{ list: Lesson[] }>());
export const RANK_SUCCESS = '[API-LESSON] RANK_SUCCESS';
export const rank_success = createAction(RANK_SUCCESS);

export const updateItems = createAction("[API-LESSON] UPDATE_MANY", props<{ items: Update<Lesson>[] }>());


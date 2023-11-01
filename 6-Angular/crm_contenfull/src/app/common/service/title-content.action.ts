import {createAction, props} from "@ngrx/store";
import {TitleContent} from "../model/tile-content";
import {Update} from "@ngrx/entity";
import {Carousel} from "../../store/carousel.model";

export const LOAD_REQUEST = `[API-TILE-CONTENT] LOAD_REQUEST`
export const load_request = createAction(LOAD_REQUEST);
export const LOAD_SUCCESS = `[API-TILE-CONTENT] LOAD_SUCCESS`
export const load_success = createAction(LOAD_SUCCESS, props<{ items: TitleContent[] }>());

export const ADD_REQUEST = `[API-TILE-CONTENT] CREATE_REQUEST`
export const add_request = createAction(ADD_REQUEST, props<{ obj: TitleContent }>());
// retour de l'object par le serveur avec un nouvel ID
export const ADD_SUCCESS = `[API-TILE-CONTENT] CREATE_SUCCESS`
export const add_success = createAction(ADD_SUCCESS, props<{ item: TitleContent }>());

export const UPDATE_REQUEST = `[API-TILE-CONTENT] UPDATE_REQUEST`
export const update_request = createAction(UPDATE_REQUEST, props<{ id: string, obj: TitleContent }>());
export const UPDATE_SUCCESS = `[API-TILE-CONTENT] UPDATE_SUCCESS`
export const update_success = createAction(UPDATE_SUCCESS, props<{ id: string, obj: TitleContent }>());

export const DELETE_REQUEST = `[API-TILE-CONTENT] DELETE_REQUEST`
export const delete_request = createAction(DELETE_REQUEST, props<{ id: string }>());
export const DELETE_SUCCESS = `[API-TILE-CONTENT] DELETE_SUCCESS`
export const delete_success = createAction(DELETE_SUCCESS, props<{ id: string }>());


export const RANK_REQUEST = `[API-TILE-CONTENT] RANK_REQUEST`
export const rank_request = createAction(RANK_REQUEST, props<{ list: TitleContent[] }>());
export const RANK_SUCCESS = `[API-TILE-CONTENT] RANK_SUCCESS`
export const rank_success = createAction(RANK_SUCCESS);

// Les éléments du carousel ne sont pas mise à jour, sauf pour le ranking
export const updateItems = createAction("[API-TILE-CONTENT] UPDATE_MANY",props<{ items: Update<Carousel>[] }>());

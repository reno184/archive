import { createAction, props } from '@ngrx/store';
import { FoModel } from '@arpege/models';

export const LOAD_REQUEST = '[API/FO] Load Request';
export const LoadRequest = createAction(LOAD_REQUEST);
export const LOAD_SUCCESS = '[API/FO] Load Success';
export const LoadSuccess = createAction(
  LOAD_SUCCESS,
  props<{ items: FoModel[] }>()
);

export const POST_REQUEST = '[API/FO] Post Request';
export const POSTRequest = createAction(POST_REQUEST, props<{ body: any }>());
export const POST_SUCCESS = '[API/FO] Post Success';
export const POSTSuccess = createAction(POST_SUCCESS, props<{ item: FoModel }>());

export const PUT_REQUEST = '[API/FO] Put Request';
export const PUTRequest = createAction(
  PUT_REQUEST,
  props<{ body: any; id: string }>()
);
export const PUT_SUCCESS = '[API/FO] Put Success';
export const PUTSuccess = createAction(PUT_SUCCESS, props<{ item: FoModel }>());


export const ID_RESET = '[API/FO] new id reset';
export const idReset = createAction(ID_RESET);

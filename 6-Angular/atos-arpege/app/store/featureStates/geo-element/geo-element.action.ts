import { createAction, props } from '@ngrx/store';
import { GeoElementCommonModel } from '@arpege/models';

export const LOAD_REQUEST = '[API/GeoElement] Load Request';
export const LoadRequest = createAction(LOAD_REQUEST);
export const LOAD_SUCCESS = '[API/GeoElement] Load Success';
export const LoadSuccess = createAction(
  LOAD_SUCCESS,
  props<{ items: any[] }>()
);

export const POST_REQUEST = '[API/GeoElement] Post Request';
export const POSTRequest = createAction(POST_REQUEST, props<{ body: GeoElementCommonModel }>());
export const POST_SUCCESS = '[API/GeoElement] Post Success';
export const POSTSuccess = createAction(
  POST_SUCCESS,
  props<{ item: GeoElementCommonModel }>()
);

export const PUT_REQUEST = '[API/GeoElement] Put Request';
export const PUTRequest = createAction(
  PUT_REQUEST,
  props<{ body: GeoElementCommonModel; id: string }>()
);
export const PUT_SUCCESS = '[API/GeoElement] Put Success';
export const PUTSuccess = createAction(PUT_SUCCESS, props<{ item: GeoElementCommonModel }>());

export const ID_RESET = '[API/GeoElement] new id reset';
export const idReset = createAction(ID_RESET);

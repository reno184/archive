import { createAction, props } from '@ngrx/store';
import { MissionSetupModel } from '@arpege/models';
import { FormGroup } from '@angular/forms';

export const LOAD_REQUEST = '[API/setup-mission] Load Request';
export const LoadRequest = createAction(LOAD_REQUEST);

export const LOAD_SUCCESS = '[API/setup-mission] Load Success';
export const LoadSuccess = createAction(
  LOAD_SUCCESS,
  props<{ items: MissionSetupModel[] }>()
);

export const POST_REQUEST = '[API/setup-mission] Post Request';
export const POSTRequest = createAction(POST_REQUEST, props<{ body: MissionSetupModel }>());
export const POST_SUCCESS = '[API/setup-mission] Post Success';
export const POSTSuccess = createAction(POST_SUCCESS, props<{ item: MissionSetupModel }>());

export const PUT_REQUEST = '[API/setup-mission] Put Request';
export const PUTRequest = createAction(
  PUT_REQUEST,
  props<{ body: MissionSetupModel; id: string }>()
);
export const PUT_SUCCESS = '[API/setup-mission] Put Success';
export const PUTSuccess = createAction(PUT_SUCCESS, props<{ item: MissionSetupModel }>());

export const ATTACH_ITEM = '[API/setup-mission] Attach item';
export const AttachItem = createAction(ATTACH_ITEM, props<{ item: FormGroup }>());

export const DETACH_ITEM = '[API/setup-mission] Attach item';
export const DetachItem = createAction(DETACH_ITEM, props<{ id: string }>());

export const MISSION_LOAD = '[API/setup-mission] mission load';
export const missionLoad = createAction(MISSION_LOAD);

export const ID_RESET = '[API/setup-mission] new id reset';
export const idReset = createAction(ID_RESET);

export const MISSION_SELECTED = '[API/setup-mission] mission selected';
export const missionSelected = createAction(MISSION_SELECTED, props<{ id: string }>());

import { createAction, props } from '@ngrx/store';
import { TrackModel } from './track.model';
import { Update } from '@ngrx/entity';

export const LOAD_REQUEST = '[API/Track] Load Request';
export const openWebsocketChannel = createAction(LOAD_REQUEST);

export const LOAD_SUCCESS = '[API/Track] Load Success';
export const LoadSuccess = createAction(LOAD_SUCCESS, props<{ items: TrackModel[] }>());

export const UPDATE_TRACK = '[API/Track] Update track';
export const updateTrack = createAction(UPDATE_TRACK, props<{ trackModified: Update<TrackModel> }>());

export const TOGGLE_ALL_TRACK = '[API/Track] Toggle all track';
export const toggleAllTrack = createAction(TOGGLE_ALL_TRACK, props<{ tracksUpdate: Update<TrackModel>[] }>());

export const SELECT_TRACK = '[API/Track] Select track';
export const selectTrack = createAction(SELECT_TRACK, props<{ id: number }>());

export const CHANGE_IDENTITY_API = '[API/Track] change identity api';
export const changeIdentityAPI = createAction(CHANGE_IDENTITY_API, props<{ id: number, value: number }>());


export const KILL_API = '[API/Track] kill api';
export const killAPI = createAction(KILL_API, props<{ id: number }>());

export const KILL_SUCCESS = '[API/Track] kill success';
export const killSuccess = createAction(KILL_SUCCESS);

export const TRACK_ACTIVE_API = '[API/Track] toggle active api';
export const trackActiveAPI = createAction(TRACK_ACTIVE_API, props<{ id: number, val: number }>());

export const TRACK_ACTIVE_SUCCESS = '[API/Track] toggle active success';
export const trackActiveSuccess = createAction(TRACK_ACTIVE_SUCCESS);

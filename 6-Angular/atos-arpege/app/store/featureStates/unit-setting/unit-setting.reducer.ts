import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as frmAction from './unit-setting.action';

export const FEATURE_UNIT_SETTING = 'FEATURE_UNIT_SETTING';

export interface SettingState {
  altitude: string;
  distance: string;
  latlng: string;
  carte: string;
  speed: string;
  degree: string;
}

// todo initalisaler par la configuration
// todo changement basic et satellite ici

const initialState: SettingState = {
  altitude: '0',
  distance: '0',
  degree: '0',
  latlng: '0',
  carte: '0',
  speed: '0'
};

const reducer = createReducer(
  initialState,
  on(frmAction.changeAltitude, (state: SettingState, { altitude }) => ({
    ...state,
    altitude
  })),
  on(frmAction.changeDistance, (state: SettingState, { distance }) => ({
    ...state,
    distance
  })),
  on(frmAction.changeSpeed, (state: SettingState, { speed }) => ({
    ...state,
    speed
  })),
  on(frmAction.changeDegrees, (state: SettingState, { degree }) => ({
    ...state,
    degree
  })),
  on(frmAction.changeLatLng, (state: SettingState, { latlng }) => ({
    ...state,
    latlng
  })),
  on(frmAction.changeCarte, (state: SettingState, { carte }) => ({
    ...state,
    carte
  }))
);

export function UnitSettingReducer(
  state: SettingState,
  action: Action
): SettingState {
  return reducer(state, action);
}

export const getFeatureState = createFeatureSelector<SettingState>(
  FEATURE_UNIT_SETTING
);

export const getAltitude = createSelector(
  getFeatureState,
  (state: SettingState) => state.altitude
);


export const getDistance = createSelector(
  getFeatureState,
  (state: SettingState) => state.distance
);

export const getTypeCarte = createSelector(
  getFeatureState,
  (state: SettingState) => state.carte
);

export const getLatlng = createSelector(
  getFeatureState,
  (state: SettingState) => state.latlng
);
export const getSpeed = createSelector(
  getFeatureState,
  (state: SettingState) => state.speed
);
export const getDegrees = createSelector(
  getFeatureState,
  (state: SettingState) => state.degree
);

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as frmPCI from './pci/pci.reducer';


export const FEATURE_SCENE = 'FeatureScene';

export interface SceneState {
  pci: frmPCI.PciState;
}

export const SceneReducers: ActionReducerMap<SceneState> = {
  pci: frmPCI.PciReducer
};

// Create feature app root point
export const getFeatureSceneState = createFeatureSelector<SceneState>(
  FEATURE_SCENE
);

export const PieceStatePCI = createSelector(
  getFeatureSceneState,
  (state: SceneState) => state.pci
);


export const getPciArray = createSelector(
  PieceStatePCI,
  (state: frmPCI.PciState) => state.datas
);



export const getJreNetworkState = createSelector(
  PieceStatePCI,
  (state: frmPCI.PciState) => state.jre_state
);

export const getPciAllNetworkState = createSelector(
  PieceStatePCI,
  (state: frmPCI.PciState) => state.all_wifi_state
);

export const getPciAllEmissionState = createSelector(
  PieceStatePCI,
  (state: frmPCI.PciState) => state.all_emission
);





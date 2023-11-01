import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { cloneMission, onUpdateInfoPCI } from './mission.action';


export const FEATURE_KEY = 'FeatureMission';

function isPciConnected(missionPciArray, entities): any[] {
  return missionPciArray.map((pciInfo, index) => {
    return Object.assign({}, pciInfo, { 'pci-connected': entities.hasOwnProperty(index + 1) ? entities[index + 1].status : '3' });
  });
}


function isEmpty(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

function isAllPciConnected(entities) {
  let rep;
  if (isEmpty(entities)) {
    rep = '3'; // en cours
  } else {
    rep = '1'; // connecté
    for (const prop in entities) {
      if (entities[prop].status === 0) {
        rep = '0'; // déconnecté
      }
    }
  }
  return rep;
}

export interface MissionState {
  id: string;
  name: string;
  'mission-pci-list': any[];
}

const initialState: MissionState = {
  id: '',
  name: '',
  'mission-pci-list': []
};

const reducer = createReducer(
  initialState,
  on(cloneMission, (state: MissionState, { setup }) => ({
    ...state,
    id: setup.id,
    name: setup['mission-name'],
    'mission-pci-list': setup['pci-list'].filter(item => item['pci-actif'])
  })),
  on(onUpdateInfoPCI, (state: MissionState, { entities }) => ({
    ...state,
    'all-pci-connected': isAllPciConnected(entities),
    'mission-pci-list': isPciConnected(state['mission-pci-list'], entities)
  })));


export function Reducer(state, action): MissionState {
  return reducer(state, action);
}

// Create feature app root point
export const getFeatureMissionState = createFeatureSelector<MissionState>(
  FEATURE_KEY
);

export const getMission = createSelector(
  getFeatureMissionState,
  (state: MissionState) => state
);



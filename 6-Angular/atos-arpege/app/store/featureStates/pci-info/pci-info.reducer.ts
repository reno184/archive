import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PciInfo } from '@arpege/models';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as infoPciAction from './pci-info.action';

export const FEATURE_KEY = 'FeaturePCIinfo';

export interface InfoPCIState extends EntityState<PciInfo> {

}

function sortBy(a: PciInfo, b: PciInfo): number {
  try {
    return a.name.localeCompare(b.name);
  } catch (err) {
    throw new Error('Pci info');
  }
}

export function selectId(a: PciInfo): number {
  return a.pci_id;
}

const adapter: EntityAdapter<PciInfo> = createEntityAdapter<PciInfo>({
  selectId,
  sortComparer: sortBy
});

const initialState: InfoPCIState = adapter.getInitialState({

});

const reducer = createReducer(
  initialState,
  on(infoPciAction.channelOpened, (state, { items }) => adapter.addAll(items, { ...state })));

export function Reducer(state, action) {
  return reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();


const featureState = createFeatureSelector<InfoPCIState>(
  FEATURE_KEY
);

export const getAll = createSelector(
  featureState,
  selectAll
);

export const getEntities = createSelector(
  featureState,
  selectEntities
);
/*

export const getNoPci = createSelector(
  featureState,
  (state: InfoPCIState) => state.noPci
);
*/

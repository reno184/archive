import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as setupAction from './setup.action';
import { MissionSetupModel } from '@arpege/models';

export interface SetupState extends EntityState<MissionSetupModel> {
  loading: boolean;
  submitting: boolean;
  newSetup: string | null;
}

export function sortBy(a: MissionSetupModel, b: MissionSetupModel): number {
  try {
    return a['mission-name'].localeCompare(b['mission-name']);
  } catch (err) {
    throw new Error('Setup a title or b title missing');
  }
}

const adapter: EntityAdapter<MissionSetupModel> = createEntityAdapter<MissionSetupModel>({
  sortComparer: sortBy
});

const initialState: SetupState = adapter.getInitialState({
  loading: false,
  submitting: false,
  newSetup: null,
});

const reducer = createReducer(
  initialState,
  on(setupAction.LoadRequest, state => ({ ...state, loading: true })),
  on(setupAction.POSTRequest, state => ({ ...state, submitting: true })),
  on(setupAction.PUTRequest, state => ({ ...state, submitting: true })),
  on(setupAction.LoadSuccess, (state, { items }) => adapter.addAll(items, { ...state, loading: false })),
  on(setupAction.POSTSuccess, (state, { item }) => adapter.addOne(item, {
    ...state,
    submitting: false,
    newSetup: item.id
  })),
  on(setupAction.idReset, state => ({ ...state, newSetup: null })),
  on(setupAction.PUTSuccess, (state, { item }) => adapter.updateOne({
    id: item.id,
    changes: item
  } as Update<MissionSetupModel>, { ...state, submitting: false }))
);

export function SetupReducer(
  state: SetupState,
  action: Action
): SetupState {
  return reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const FEATURE_SETUP = 'FeatureSetup';

export const getSetupFeatureState = createFeatureSelector<SetupState>(
  FEATURE_SETUP
);

export const selectSetupList = createSelector(
  getSetupFeatureState,
  selectAll
);

export const SelectSetupAll = createSelector(
  getSetupFeatureState,
  selectAll
);

export const SelectSetupEntities = createSelector(
  getSetupFeatureState,
  selectEntities
);

export const selectLoading = createSelector(
  getSetupFeatureState,
  (state) => state.loading
);
export const selectSubmitting = createSelector(
  getSetupFeatureState,
  (state) => state.submitting
);

export const selectById = createSelector(
  SelectSetupEntities,
  (setupEntities, { id }) => {
    return setupEntities[id];
  }
);

export const getNewSetup = createSelector(
  getSetupFeatureState,
  (state) => state.newSetup
);

import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as foAction from './fo.action';
import { FoModel } from '@arpege/models';


export const FEATURE_FO = 'FoFeature';

export interface FoState extends EntityState<FoModel> {
  loading: boolean;
  submitting: boolean;
  newSetup: string | null;
}

export function sortBy(a: FoModel, b: FoModel): number {
  try {
    return a.FO_NAME.localeCompare(b.FO_NAME);
  } catch (err) {
    throw new Error('a title or b title missing');
  }
}

const adapter: EntityAdapter<FoModel> = createEntityAdapter<FoModel>({
  sortComparer: sortBy
});

const initialState: FoState = adapter.getInitialState({
  loading: false,
  submitting: false,
  newSetup: null
});

const reducer = createReducer(
  initialState,
  on(foAction.LoadRequest, state => ({ ...state, loading: true })),
  on(foAction.POSTRequest, state => ({ ...state, submitting: true })),
  on(foAction.PUTRequest, state => ({ ...state, submitting: true })),
  on(foAction.LoadSuccess, (state, { items }) => adapter.addAll(items, { ...state, loading: false })),
  on(foAction.POSTSuccess, (state, { item }) => adapter.addOne(item, {
    ...state,
    submitting: false,
    newSetup: item.id
  })),
  on(foAction.idReset, state => ({ ...state, newSetup: null })),
  on(foAction.PUTSuccess, (state, { item }) => adapter.updateOne({
    id: item.id,
    changes: item
  } as Update<FoModel>, { ...state, submitting: false }))
);

export function FoReducer(state: FoState, action: Action): FoState {
  return reducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();

export const getFeatureState = createFeatureSelector<FoState>(
  FEATURE_FO
);

export const getFoAll = createSelector(getFeatureState, selectAll);
export const getFoEntities = createSelector(getFeatureState, selectEntities);
export const getFoLoading = createSelector(
  getFeatureState,
  (state: FoState) => state.loading
);
export const selectFOSubmitting = createSelector(
  getFeatureState,
  (state: FoState) => state.submitting
);
export const selectFoById = createSelector(getFoEntities, (entities, props) => {
  return entities[props.id];
});


export const getNewSetup = createSelector(
  getFeatureState,
  (state) => state.newSetup
);

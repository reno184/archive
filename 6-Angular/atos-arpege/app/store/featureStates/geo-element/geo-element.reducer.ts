import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as GeoElementAction from './geo-element.action';
import { GeoElementCommonModel } from '@arpege/models';

export const FEATURE_GEO_ELEMENT = 'GeoElementFeature';

export interface GeoElementState extends EntityState<GeoElementCommonModel> {
  loading: boolean;
  submitting: boolean;
  newSetup: string | null;
}

export function sortBy(a: GeoElementCommonModel, b: GeoElementCommonModel): number {
  try {
    return a['marker-title'].localeCompare(b['marker-title']);
  } catch (err) {
    throw new Error('Reducer sortby: marker-title (field missing)');
  }
}

const adapter: EntityAdapter<GeoElementCommonModel> = createEntityAdapter<GeoElementCommonModel>({
  sortComparer: sortBy
});

const initialState: GeoElementState = adapter.getInitialState({
  loading: false,
  submitting: false,
  newSetup: null
});


const reducer = createReducer(
  initialState,
  on(GeoElementAction.LoadRequest, state => ({ ...state, loading: true })),
  on(GeoElementAction.POSTRequest, state => ({ ...state, submitting: true })),
  on(GeoElementAction.PUTRequest, state => ({ ...state, submitting: true })),
  on(GeoElementAction.LoadSuccess, (state, { items }) => adapter.addAll(items, { ...state, loading: false })),
  on(GeoElementAction.POSTSuccess, (state, { item }) => adapter.addOne(item, {
    ...state,
    submitting: false,
    newSetup: item.id
  })),
  on(GeoElementAction.idReset, state => ({ ...state, newSetup: null })),
  on(GeoElementAction.PUTSuccess, (state, { item }) => adapter.updateOne({
    id: item.id,
    changes: item
  } as Update<GeoElementCommonModel>, { ...state, submitting: false }))
);

export function GeoElementReducer(state: GeoElementState, action: Action): GeoElementState {
  return reducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();

export const getFeatureState = createFeatureSelector<GeoElementState>(
  FEATURE_GEO_ELEMENT
);

export const getGeoElementAll = createSelector(
  getFeatureState,
  selectAll
);
export const getGeoElementEntities = createSelector(
  getFeatureState,
  selectEntities
);
export const selectLoading = createSelector(
  getFeatureState,
  (state: GeoElementState) => state.loading
);
export const selectSubmitting = createSelector(
  getFeatureState,
  (state: GeoElementState) => state.submitting
);
export const selectByCategory = createSelector(
  getGeoElementAll,
  (array, { value }) => {
    return array.filter(item => item['marker-type'] === value);
  }
);

export const selectByIds = createSelector(
  getGeoElementAll,
  (array, { ids }) => {
    return array.filter(item => ids.includes(item.id));
  }
);

// todo mettre un console info est comprendre pourquoi cette méthode est appelée en continue
export const geoElementById = createSelector(
  getGeoElementEntities,
  (entities, { params }) => {
    return entities[params.id];
  }
);

export const getNewSetup = createSelector(
  getFeatureState,
  (state) => state.newSetup
);

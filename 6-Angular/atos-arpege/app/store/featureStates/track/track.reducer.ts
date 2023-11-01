import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { TrackModel } from './track.model';
import * as actionTrack from './track.action';

export const FEATURE_KEY = 'FeatureTrack';

export interface TrackState extends EntityState<TrackModel> {
  loading: boolean;
  loaded: boolean;
  trackSelected: number | null;
}

function sortBy(a: TrackModel, b: TrackModel): number {
  try {
    return a.tn_ref.localeCompare(b.tn_ref);
  } catch (err) {
    throw new Error('Track a tn_ref or b title tn_ref');
  }
}

function onScene(oldEntities, newEntities): TrackModel[] {
  return newEntities.map(item => {
    return Object.assign({}, item, {
      onScene: oldEntities[item.tn_id] ? oldEntities[item.tn_id].onScene : true,
      kill: (item.kill ? item.kill : 0),
      altitude: (item.altitude ? item.altitude : 800)
    });
  });
}

export function selectTrackId(a: TrackModel): number {
  return a.tn_id;
}

const adapter: EntityAdapter<TrackModel> = createEntityAdapter<TrackModel>({
  selectId: selectTrackId,
  sortComparer: sortBy
});

const initialState: TrackState = adapter.getInitialState({
  loading: false,
  loaded: false,
  trackSelected: null
});

const reducer = createReducer(
  initialState,
  on(actionTrack.openWebsocketChannel, state => ({ ...state, loading: true })),
  on(actionTrack.LoadSuccess, (state, { items }) => {
    return adapter.addAll(onScene(state.entities, items), { ...state, loading: false, loaded: true });
  }),
  on(actionTrack.selectTrack, (state, { id }) => ({ ...state, trackSelected: id })),
  on(actionTrack.updateTrack, (state, { trackModified }) => adapter.updateOne(trackModified, state)),
  on(actionTrack.toggleAllTrack, (state, { tracksUpdate }) => adapter.updateMany(tracksUpdate, state)));

export function Reducer(state, action) {
  return reducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();


const featureState = createFeatureSelector<TrackState>(
  FEATURE_KEY
);

export const getAll = createSelector(
  featureState,
  selectAll
);

export const getMaxAltitude = createSelector(
  getAll,
  (tracks) => Math.max(...tracks.map(elt => elt.altitude ? elt.altitude : 1000))
);

export const getTrackOnScene = createSelector(
  getAll,
  (tracks) => tracks.filter(elt => elt.onScene === true)
);

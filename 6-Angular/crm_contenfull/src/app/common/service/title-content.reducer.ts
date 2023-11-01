import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {TitleContent} from "../model/tile-content";
import {createEntityAdapter, EntityState, Update} from "@ngrx/entity";
import * as titleContentAction from "./title-content.action";


export const FEATURE_KEY = 'titleContent_key';

export interface TitleContentState extends EntityState<TitleContent> {
    listLoading: boolean;
}

export function sortByRank(a: TitleContent, b: TitleContent): number {
    return a.rank < b.rank ? -1 : 1;
}

const adapter = createEntityAdapter<TitleContent>({
    sortComparer: sortByRank
});

const initialState = adapter.getInitialState({
    listLoading: true
})

const reducer = createReducer(
    initialState,
    on(titleContentAction.load_request, (state) => ({...state, listLoading: true})),
    on(titleContentAction.load_success, (state, {items}) => adapter.addAll(items, {...state, listLoading: false})),
    on(titleContentAction.load_request, (state) => ({...state, listLoading: true})),
    on(titleContentAction.add_success, (state, {item}) => adapter.addOne(item, {...state})),
    on(titleContentAction.update_success, (state, {id, obj}) => adapter.updateOne({
        id: id,
        changes: obj
    } as Update<TitleContent>, {...state})),
    on(titleContentAction.delete_success, (state, {id}) => adapter.removeOne(id, {...state})),
    on(titleContentAction.updateItems, (state, {items}) => adapter.updateMany(items, {...state})),
);

export function Reducer(state: TitleContentState, action: Action) {
    return reducer(state, action);
}

export const selectorState = createFeatureSelector<TitleContentState>(FEATURE_KEY);
export const {selectAll, selectEntities, selectTotal} = adapter.getSelectors();
export const selectList = createSelector(selectorState, selectAll);
export const selectLoading = createSelector(selectorState, (state) => state.listLoading);
export const listById = createSelector(selectList, (items, props) => items.find(item => item.id == props.id));
export const listByFeature = createSelector(selectList, (items, props) => items.filter(item => item.feature === props.feature));

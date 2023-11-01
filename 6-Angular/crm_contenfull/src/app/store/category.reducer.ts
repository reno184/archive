import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import * as action from "./category.action";
import {Category} from "../model/features/Category";

export const FEATURE_KEY = 'CATEGORY_FEATURE';

export interface CategoryState extends EntityState<Category> {
    listLoading: boolean;
}

export function sortByField(a: Category, b: Category): number {
    return a.id < b.id ? -1 : 1;
}

const adapter = createEntityAdapter<Category>({
    sortComparer: sortByField
});

const initialState = adapter.getInitialState({
    listLoading: true
})

const reducer = createReducer(
    initialState,
    on(action.load_request, (state) => ({...state, listLoading: true})),
    on(action.load_success, (state, {items}) => adapter.addAll(items, {...state, listLoading: false})),
);

export function Reducer(state: CategoryState, action: Action) {
    return reducer(state, action);
}

export const selectorState = createFeatureSelector<CategoryState>(FEATURE_KEY);
export const {selectAll, selectEntities, selectTotal} = adapter.getSelectors();
export const selectList = createSelector(selectorState, selectAll);
export const selectLoading = createSelector(selectorState, (state) => state.listLoading);

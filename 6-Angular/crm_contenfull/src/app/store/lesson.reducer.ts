import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as action from "./lesson.action";
import {Lesson} from "./lesson.model";
import {createEntityAdapter, EntityState, Update} from "@ngrx/entity";

export const FEATURE_KEY = 'Lesson_key';

export interface LessonState extends EntityState<Lesson> {
    listLoading: boolean;
    btnAddLoading: boolean;
}

export function sortByRank(a: Lesson, b: Lesson): number {
    return a.rank < b.rank ? -1 : 1;
}

const adapter = createEntityAdapter<Lesson>({
    sortComparer: sortByRank
});

const initialState = adapter.getInitialState({
    listLoading: true,
    btnAddLoading: false
})

const reducer = createReducer(
    initialState,
    on(action.load_request, (state) => ({...state, listLoading: true})),
    on(action.load_success, (state, {items}) => adapter.addAll(items, {...state, listLoading: false})),
    on(action.add_request, (state, {obj}) => ({...state, btnAddLoading: true})),
    on(action.add_success, (state, {item}) => adapter.addOne(item, {...state, btnAddLoading: false})),
    on(action.update_success, (state, {id, obj}) => adapter.updateOne({
        id: id,
        changes: obj
    } as Update<Lesson>, {...state})),
    on(action.delete_success, (state, {id}) => adapter.removeOne(id, {...state})),
    on(action.updateItems, (state, {items}) => adapter.updateMany(items, {...state})),
);

export function Reducer(state: LessonState | undefined, action: Action) {
    return reducer(state, action);
}

export const selectorState = createFeatureSelector<LessonState>(FEATURE_KEY);
export const {selectAll, selectEntities, selectTotal} = adapter.getSelectors();
export const selectList = createSelector(  selectorState,  selectAll);
export const selectListCount = createSelector(  selectorState,  selectTotal);

export const selectLoading = createSelector(    selectorState,    (state) => state.listLoading);
export const selectAddPending = createSelector(selectorState, (state) => state.btnAddLoading);
export const itemById = createSelector(selectList, (items, props) => items.find(item => item.id == props.id));

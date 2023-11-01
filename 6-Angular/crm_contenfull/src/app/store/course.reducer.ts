import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {createEntityAdapter, EntityState, Update} from "@ngrx/entity";
import * as action from "./course.action";
import {Course} from "../model/features/Course";

export const FEATURE_KEY = 'COURSE_FEATURE';

export interface CourseState extends EntityState<Course> {
    listLoading: boolean;
}

export function sortByRank(a: Course, b: Course): number {
    return a.slug < b.slug ? -1 : 1;
}

const adapter = createEntityAdapter<Course>({
    sortComparer: sortByRank
});

const initialState = adapter.getInitialState({
    listLoading: true
})

const reducer = createReducer(
    initialState,
    on(action.load_request, (state) => ({...state, listLoading: true})),
    on(action.load_success, (state, {items}) => adapter.addAll(items, {...state, listLoading: false})),
    on(action.add_success, (state, {item}) => adapter.addOne(item, {...state})),
    on(action.update_success, (state, {id, obj}) => adapter.updateOne({
        id: id,
        changes: obj
    } as Update<Course>, {...state})),
    on(action.delete_success, (state, {id}) => adapter.removeOne(id, {...state})),
);

export function Reducer(state: CourseState, action: Action) {
    return reducer(state, action);
}

export const selectorState = createFeatureSelector<CourseState>(FEATURE_KEY);
export const {selectAll, selectEntities, selectTotal} = adapter.getSelectors();
export const selectItems = createSelector(selectorState, selectAll);
export const selectLoading = createSelector(selectorState, (state) => state.listLoading);
export const selectCourseById = createSelector(selectItems, (items, props) => items.find(item => item.id == props.id));


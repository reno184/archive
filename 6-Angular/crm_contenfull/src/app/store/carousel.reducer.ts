import {Action, createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import * as action_carousel from "./carousel.action";
import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Carousel} from "./carousel.model";

export const FEATURE_KEY = 'Carousel_key';

export interface CarouselState extends EntityState<Carousel> {
    'list-loading': boolean;
    'add-pending': boolean;
}

const adapter = createEntityAdapter<Carousel>({});

const initialState = adapter.getInitialState({
    'list-loading': true,
    'add-pending': false
})

const reducer = createReducer(
    initialState,
    on(action_carousel.load_request, (state) => ({...state, listLoading: true})),
    on(action_carousel.load_success, (state, {items}) => adapter.addAll(items, {...state, 'list-loading': false})),
    on(action_carousel.add_image, (state, {obj}) => {
        console.log(obj)
        return adapter.addOne(obj, {...state})
    }),
    on(action_carousel.delete_image, (state, {id}) => adapter.removeOne(id, {...state})),
);

export function Reducer(state: CarouselState | undefined, action: Action) {
    return reducer(state, action);
}

export const selectorState = createFeatureSelector<CarouselState>(FEATURE_KEY);
export const {selectAll, selectEntities, selectTotal} = adapter.getSelectors();
export const selectList = createSelector(selectorState, selectAll);
export const selectListCount = createSelector(selectorState, selectTotal);

export const selectListLoading = createSelector(selectorState, (state) => state['list-loading']);
export const selectAddPending = createSelector(selectorState, (state) => state['add-pending']);
export const itemById = createSelector(selectList, (items, props) => items.find(item => item.id == props.id));

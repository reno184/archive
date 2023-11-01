import {createReducer, on} from "@ngrx/store";
import * as rootAction from "./root.action";

const initialState = {
    toasts: [],
    err: null,
    loader: null,
    size: ''
};

const reducer = createReducer(
    initialState,
    on(rootAction.showToast, (state, {toast}) => ({...state, toast})),
    on(rootAction.closeToast, (state) => ({...state, toast: null})),

    on(rootAction.show_error, (state, {err}) => ({...state, err})),
    on(rootAction.hide_error, (state) => ({...state, err: null})),
    on(rootAction.init_loader, (state) => ({...state, loader: null})),
    on(rootAction.show_loader, (state) => ({...state, loader: true})),
    on(rootAction.hide_loader, (state) => ({...state, loader: false})),
    on(rootAction.updateScreenSize, (state, {size}) => ({...state, size})),
);

export function Reducer(state, action) {
    return reducer(state, action);
}

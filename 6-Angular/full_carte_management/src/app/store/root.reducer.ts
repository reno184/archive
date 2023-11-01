import {createReducer, on} from "@ngrx/store";
import * as rootAction from "./root.action";

const initialState = {
    toasts: [],
    message: null,
    blocker: false
};

const reducer = createReducer(
    initialState,
    on(rootAction.errorSystem, (state, {message}) => ({...state, message})),
    on(rootAction.addToast, (state, {toaster}) => ({...state, toasts: [...state.toasts, toaster]})),
    on(rootAction.removeToast, (state, {id}) => ({
        ...state,
        toasts: [...state.toasts.filter(item => item.id !== id)]
    })),
    on(rootAction.toogleBlocker, (state, {active}) => ({
        ...state,
        blocker: active
    })),
);

export function Reducer(state, action) {
    return reducer(state, action);
}

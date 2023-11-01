import { Action, createReducer, on } from '@ngrx/store';
import * as frmAction from './app.actions';

const initialState = {
  message: null
};

const reducer = createReducer(
  initialState,
  on(frmAction.AddMessage, (state, { err }) => {
    return { ...state, message: err.message };
  })
);

export function Reducer(state, action: Action) {
  return reducer(state, action);
}

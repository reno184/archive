import {createAction, props} from "@ngrx/store";
import {Toast} from "../shared/model/toast";

export const addToast = createAction('[toast] add', props<{ toaster: Toast }>());
export const removeToast = createAction('[toast] remove', props<{ id: string }>());
export const errorSystem = createAction('[toast] error system', props<{ message: string }>());
export const toogleBlocker = createAction('[blocker] show hide', props<{ active: boolean }>());

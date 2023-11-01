import {createAction, props} from "@ngrx/store";
import {Toast} from "../common/model/toast";

export const showToast = createAction('[toast] add', props<{ toast: Toast }>());
export const closeToast = createAction('[toast] close');

export const updateScreenSize = createAction('[root] update screen size', props<{ size: string }>());

export const SHOW_ERROR = '[TitleComponent/API] SHOW_ERROR';
export const show_error = createAction(SHOW_ERROR, props<{ err: any }>());
export const HIDE_ERROR = '[TitleComponent/API] HIDE_ERROR';
export const hide_error = createAction(HIDE_ERROR);

export const INIT_LOADER = '[TitleComponent/API] INIT_LOADER';
export const init_loader = createAction(INIT_LOADER);
export const SHOW_LOADER = '[TitleComponent/API] SHOW_LOADER';
export const show_loader = createAction(SHOW_LOADER);
export const HIDE_LOADER = '[TitleComponent/API] HIDE_LOADER';
export const hide_loader = createAction(HIDE_LOADER);

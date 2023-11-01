import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const ADD_ERROR = '[API/Error] Add message';
export const AddMessage = createAction(ADD_ERROR, props<{ err: HttpErrorResponse }>());

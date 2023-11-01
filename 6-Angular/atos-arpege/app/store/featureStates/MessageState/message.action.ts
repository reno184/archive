import { createAction, props } from '@ngrx/store';
import { Message } from './message.interface';
import { Update } from '@ngrx/entity';

export const LOAD_REQUEST = '[API/Message] Load Request';
export const LoadRequestAction = createAction(LOAD_REQUEST);

export const LOAD_SUCCESS = '[API/Message] Load Success';
export const LoadSuccessAction = createAction(
    LOAD_SUCCESS,
    props<{ items: Message[] }>(),
);

export const MARK_READ = '[API/Message] Mark as read';
export const markAsRead = createAction(
    MARK_READ,
    props<{ message: Update<Message> }>(),
);

export const MARK_ALL_READ = '[API/Message] Mark all as read';
export const markAllRead = createAction(
    MARK_ALL_READ,
    props<{ messages: Update<Message>[] }>(),
);

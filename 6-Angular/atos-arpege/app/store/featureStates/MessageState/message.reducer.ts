import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as fromAction from './message.action';
import { Message } from './message.interface';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const FEATURE_MESSAGE = 'MessageFeature';

export interface MessageState extends EntityState<Message> {
    selectedMessageId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string | null;
}

export function selectMessageId(a: Message): number {
    return a.id;
}

export function sortByBody(a: Message, b: Message): number {
    return a.body.localeCompare(b.body);
}

export const adapter: EntityAdapter<Message> = createEntityAdapter<Message>({
    selectId: selectMessageId,
    sortComparer: sortByBody,
});

export const initialState: MessageState = adapter.getInitialState({
    selectedMessageId: null,
    loading: false,
    loaded: false,
    error: null,
});

const reducer = createReducer(
    initialState,
    on(fromAction.LoadRequestAction, state => ({ ...state, loading: true })),
    on(fromAction.LoadSuccessAction, (state, { items }) =>
        adapter.addAll(items, {
            ...state,
            loading: false,
            loaded: true,
        }),
    ),
    on(fromAction.markAsRead, (state, { message }) =>
        adapter.updateOne(message, state),
    ),
    on(fromAction.markAllRead, (state, { messages }) =>
        adapter.updateMany(messages, state),
    ),
);

export function MessageReducer(
    state: MessageState,
    action: Action,
): MessageState {
    return reducer(state, action);
}

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const getFeatureMessageState = createFeatureSelector<MessageState>(
    FEATURE_MESSAGE,
);

export const getMessageLoading = createSelector(
    getFeatureMessageState,
    (state: MessageState) => state.loading,
);
export const getMessageId = createSelector(
    getFeatureMessageState,
    (state: MessageState) => state.selectedMessageId,
);

export const selectMessageIds = createSelector(
    getFeatureMessageState,
    selectIds,
);
export const selectMessageEntities = createSelector(
    getFeatureMessageState,
    selectEntities,
);
export const selectAllMessages = createSelector(
    getFeatureMessageState,
    selectAll,
);
export const selectMessageTotal = createSelector(
    getFeatureMessageState,
    selectTotal,
);

export const selectCurrentMessage = createSelector(
    selectMessageEntities,
    getMessageId,
    (messageEntities, messageId) => messageEntities[messageId],
);


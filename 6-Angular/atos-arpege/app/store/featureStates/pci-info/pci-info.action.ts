import { createAction, props } from '@ngrx/store';
import { PciInfo } from '@arpege/models';

export const OPEN_CHANNEL = '[API/Pci-info] Open channel';
export const openWebsocketChannel = createAction(OPEN_CHANNEL);

export const CHANNEL_OPENED = '[API/Pci-info] chanel opened';
export const channelOpened = createAction(CHANNEL_OPENED, props<{ items: PciInfo[] }>());

export const CHANNEL_NOT_OPENED = '[API/Pci-info] chanel not opened';
export const channelNotOpened = createAction(CHANNEL_NOT_OPENED);

import { createAction, props } from '@ngrx/store';
import { JreSt, PciInfo } from '@arpege/models';

export const GET_ALL = '[API/Pci] Load request';
export const getAll = createAction(GET_ALL);

export const GET_ALL_SUCCESS = '[API/Pci] Load Success';
export const getAllSuccess = createAction(GET_ALL_SUCCESS, props<{ pciArray: PciInfo[] }>());

export const GET_JRE = '[API/Jre] Load JRE request';
export const getJre = createAction(GET_JRE);

export const GET_JRE_SUCCESS = '[API/Jre] Load JRE state success';
export const getJreNetworkState = createAction(GET_JRE_SUCCESS, props<{ jrest: JreSt }>());


// todo depreciated
export const REP_PCI_NETWORK_STATE = '[API/Pci] item pci network';
export const GET_PCI_NETWORK_STATE = '[API/Pci]  all pci network';

export const ALL_START = '[API/Pci] all network pending';
export const ALL_NETWORK_SUCCESS = '[API/Pci] all network success';
export const ALL_NETWORK_ERROR = '[API/Pci] all network error';

export const ROW_START = '[API/Pci] row network pending';
export const ROW_START2 = '[API/Pci]2 row network pending';

export const ROW_NETWORK_SUCCESS = '[API/Pci] row network success';


export const allStart = createAction(ALL_START);
export const successAllNetwork = createAction(ALL_NETWORK_SUCCESS);
export const errorAllNetwork = createAction(ALL_NETWORK_ERROR);

export const rowSuccess = createAction(
    ROW_NETWORK_SUCCESS,
    props<{ id: number }>(),
);

export const getPciNetworkState = createAction(
    GET_PCI_NETWORK_STATE,
    props<{ repeater: number; id: number }>(),
);

export const repPciNetworkState = createAction(
    REP_PCI_NETWORK_STATE,
    props<{ id: number }>(),
);

export const ALL_STOP_EMISSION = '[API/PCI/EMISSION] all network error';
export const allStopEmission = createAction(ALL_STOP_EMISSION);

export const ROW_STOP_EMISSION = '[API/PCI/EMISSION] row network error';
export const rowStopEmission = createAction(
    ROW_STOP_EMISSION,
    props<{ id: number }>(),
);

export const CHANGE_MODE = '[API/PCI] change mode';
export const changeMode = createAction(
    CHANGE_MODE,
    props<{ pci: number; mode: string }>(),
);

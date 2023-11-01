import { JreCnxSt, JreRtcSt, JreSt, PciInfo } from '@arpege/models';
import { Action, createReducer, on } from '@ngrx/store';
import * as frmAction from './pci.action';

// todo depreciated
export interface PciState {
    datas: PciInfo[];
    jre_state: JreSt;
    loading: boolean;
    loaded: boolean;
    all_wifi_state: string;
    all_emission: boolean;
}

const initialState: PciState = {
    datas: [],
    jre_state: { cnx_st: JreCnxSt.JRE_DISCONNECTED, rtc_st: JreRtcSt.RTC_NO_STATEMENT, latency: 0 },
    loading: false,
    loaded: false,
    all_wifi_state: 'inherit',
    all_emission: true,
};

const reducer = createReducer(
    initialState,
    on(frmAction.getAll, (state: PciState) => ({
        ...state,
        loading: true,
    })),
    on(frmAction.getAllSuccess, (state: PciState, { pciArray }) => ({
        ...state,
        loading: false,
        loaded: true,
        datas: pciArray,
    })),
    on(frmAction.allStart, (state: PciState) => ({
        ...state,
        all_wifi_state: 'pending',
        datas: state.datas.map(item => {
            return Object.assign({}, item, { wifi_state: 'pending' });
        }),
    })),
    on(frmAction.getJre, (state: PciState) => ({
        ...state,
    })),
    on(frmAction.getJreNetworkState, (state: PciState, { jrest }) => ({
        ...state,
        jre_state: jrest,
    })),
    on(frmAction.successAllNetwork, (state: PciState) => ({
        ...state,
        all_wifi_state: 'success',
    })),
    on(frmAction.repPciNetworkState, (state: PciState, { id }) => ({
        ...state,
        datas: state.datas.map(item => {
            if (item.pci_id === id) {
                return Object.assign({}, item, { wifi_state: 'complete' });
            } else {
                return item;
            }
        }),
    })),
    on(frmAction.rowSuccess, (state: PciState, { id }) => ({
        ...state,
        datas: state.datas.map(item => {
            return item.pci_id === id
                ? Object.assign({}, item, { wifi_state: 'complete' })
                : item;
        }),
    })),
    on(frmAction.allStopEmission, (state: PciState) => ({
        ...state,
        all_emission: false,
        datas: state.datas.map(item => {
            return Object.assign({}, item, { emission: false });
        }),
    })),
    on(frmAction.rowStopEmission, (state: PciState, { id }) => ({
        ...state,
        datas: state.datas.map(item => {
            return item.pci_id === id
                ? Object.assign({}, item, { emission: false })
                : item;
        }),
    })),
    on(frmAction.changeMode, (state: PciState, { pci, mode }) => ({
        ...state,
        datas: state.datas.map(item => {
            return item.pci_id === pci ? Object.assign({}, item, { mode }) : item;
        }),
    })),
);

export function PciReducer(state: PciState, action: Action): PciState {
    return reducer(state, action);
}

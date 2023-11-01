import { createAction, props } from '@ngrx/store';
import { MissionSetupModel } from '@arpege/models';

// la mission est le clone d'un setup (préparation mission
export const CLONE_MISSION = '[API/mission] clone mission';
export const cloneMission = createAction(CLONE_MISSION, props<{ setup: MissionSetupModel }>());

// Ouvre le websocket pour tester la connexion des pci
export const OPEN_PCI_CHANEL = '[API/mission] open pci channel';
export const openPCIchannel = createAction(OPEN_PCI_CHANEL);

// Test en permanence la connexion des pci
export const ON_UPDATE_PCI_INFO = '[API/mission] on pci channel';
export const onUpdateInfoPCI = createAction(ON_UPDATE_PCI_INFO, props<{ entities: any }>());


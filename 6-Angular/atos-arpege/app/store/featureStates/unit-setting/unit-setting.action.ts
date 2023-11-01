import { createAction, props } from '@ngrx/store';

export const changeAltitude = createAction(
  '[unit-setting] change timer',
  props<{ altitude: string }>()
);

export const changeDistance = createAction(
  '[unit-setting] change distance',
  props<{ distance: string }>()
);

export const changeLatLng = createAction(
  '[unit-setting] change LatLng',
  props<{ latlng: string }>()
);

export const changeCarte = createAction(
  '[unit-setting] change carte',
  props<{ carte: string }>()
);
export const changeDegrees = createAction(
  '[unit-setting] change degrees',
  props<{ degree: string }>()
);
export const changeSpeed = createAction(
  '[unit-speed] change carte',
  props<{ speed: string }>()
);

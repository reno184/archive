import { Injectable } from '@angular/core';

@Injectable()
export class ConstantesService {
  labels = {
    lat: 'lat',
    lng: 'lng',
    alt: 'alt',
    azimut: 'Azimut',
    takeit: 'Prendre le contrôle',
    flyto: 'Centrer sur la carte',
    disconnected: 'Déconnecté'
  };
}

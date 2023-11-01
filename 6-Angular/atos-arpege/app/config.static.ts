import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticConfig {
  intervalWebsocket: 10000;
  default = {
    view: {
      lat: 43.37311218382002,
      lng: 5.5199432373046875,
      zoom: 11
    }
  };

  colors = [
    '#000',
    '#fff',
    '#FF1744',
    '#3E2723',
    '#D500F9',
    '#00B0FF',
    '#3D5AFE',
    '#1DE9B6',
    '#76FF03',
    '#00C853',
    '#C6FF00',
    '#FFD600',
    '#FF6D00',
    '#8D6E63',
    '#607D8B'
  ];

  PciStatusType = {
    0: {
      lib: 'Déconnecté',
      color: '#dc1212',
      icon: 'fa-wifi-slash'
    },
    1: {
      lib: 'Connecté',
      color: '#76FF03',
      icon: 'fa-wifi'
    },
    3: {
      lib: 'En cours',
      color: '#FF6D00',
      icon: 'fa-spinner fa-spin'
    }
  };

}

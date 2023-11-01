import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaticDatas {

  labels = {
    controls: {
      back: 'retour',
      add: 'Ajouter'
    },
    title: {
      update: 'Mise  à jour',
      add: 'Ajout'
    },
    features: {
      fo: 'Forme d\'onde'
    },
    identity: 'identité',
    cap: 'cap',
    vitesse: 'Vitesse',
    altitude: 'altitude',
    lat: 'latitude',
    lng: 'longitude',
    coordinates: 'cordonnée',
    name: 'nom',
    'no-datas': 'Pas de donnée',
    toggle: 'Plier/déplier',
    status: 'status',
    kill: 'kill',
    alive: 'alive'
  };

  objects = {
    trackIdentity: {
      0: {
        lib: 'neutre',
        imgPath: 'NEUTRAL',
        color: 'gold'
      },
      1: {
        lib: 'ami',
        imgPath: 'FRIEND',
        color: 'darkblue'
      },
      2: {
        lib: 'ennemi',
        imgPath: 'ENNEMY',
        color: 'red'
      }
    },
    trackStatus: {
      0: {
        lib: 'active',
        imgPath: 'ACTIVE'
      },
      1: {
        lib: 'inactive',
        imgPath: 'INACTIVE'
      }
    },
    pciMode: {
      0: {
        lib: 'controllé'
      },
      1: {
        lib: 'autonome'
      }
    },
    trackKill: {
      0: {
        lib: 'alive',
        imgPath: 'ALIVE'
      },
      1: {
        lib: 'killed',
        imgPath: 'KILLED'
      }
    },
    menuTop: {
      modalmenu: {
        key: 'menu',
        lib: 'Tableau de bord',
        icon: 'fa-tachometer-alt-slowest'
      },
      network: {
        key: 'network',
        lib: 'Réseau',
        icon: 'fa-chart-network'
      },
      mission: {
        key: 'prepa',
        lib: 'Préparation mission',
        icon: 'fa-play-circle'
      },
      info: {
        key: 'pci',
        lib: 'PCI info',
        icon: 'fa-truck'
      },
      payload: {
        key: 'payload',
        lib: 'Charges utiles',
        icon: 'fa-wifi'
      },
      setting: {
        key: 'setting',
        lib: 'Réglages',
        icon: 'fa-cogs'
      },
      playstop: {
        key: 'playstop',
        lib: 'Stop émissions',
        icon: 'fa-stop-circle'
      },
      message: {
        key: 'message',
        lib: 'Alertes',
        icon: 'fa-circle'
      }
    },
    'fo-mode': {
      0: {
        lib: 'semi-automatique'
      },
      1: {
        lib: 'automatique'
      }
    },
    'unit-speed': {
      0: {
        coef: 1.8288,
        lib: 'km/h'
      },
      /*      1: {
              coef: 1.8288 * 3.6,
              lib: 'm/s'
            },*/
      1: {
        coef: 1.8288 / 1224,
        lib: 'mach'
      },
      2: {
        coef: 0.987,
        lib: 'knot'
      }
    },
    'unit-degree': {
      0: {
        coef: (degree) => degree,
        lib: 'Degré',
        src: true
      }
      /*      1: {
              coef: (degree) => degree * (Math.PI / 180),
              lib: 'Rad'
            }*/
    },
    'unit-distance': {
      0: {
        val: 1,
        lib: 'km'
      },
      1: {
        coef: 1.609,
        lib: 'nm',
        src: true
      },
      2: {
        coef: 0.001,
        lib: 'm'
      }
    },
    'unit-altitude': {
      0: {
        coef: 0.3048,
        lib: 'Feet',
        src: true
      },
      1: {
        coef: 1,
        lib: 'm'
      },
      2: {
        coef: 0.001,
        lib: 'km'
      }
    },
    'type-carte': {
      0: {
        val: 'basic',
        lib: 'Online basic'
      },
      1: {
        val: 'satellite',
        lib: 'Online satellite'
      }
    },
    'unit-latlng': {
      0: {
        lat: (lat: number): string => lat.toString().split('.')[0] + '.' + lat.toString().split('.')[1].substring(0, 7),
        lng: (lng: number): string => lng.toString().split('.')[0] + '.' + lng.toString().split('.')[1].substring(0, 7),
        lib: 'DD'
      },
      1: {
        lat: (lat: number): string => {
          let latResult = lat >= 0 ? 'N' : 'S';
          lat = Math.abs(lat);
          const valDeg = Math.floor(lat);
          latResult += valDeg + 'º';
          const valMin = Math.floor((lat - valDeg) * 60);
          latResult += valMin + `'`;
          const valSec = Math.round((lat - valDeg - valMin / 60) * 3600 * 1000) / 1000;
          latResult += valSec + '"';
          return latResult;
        },
        lng: (lng: number): string => {
          let lngResult = lng >= 0 ? 'E' : 'W';
          lng = Math.abs(lng);
          const valDeg = Math.floor(lng);
          lngResult += valDeg + 'º';
          const valMin = Math.floor((lng - valDeg) * 60);
          lngResult += valMin + `'`;
          const valSec = Math.round((lng - valDeg - valMin / 60) * 3600 * 1000) / 1000;
          lngResult += valSec + '"';
          return lngResult;
        },
        lib: 'DMS'
      }
    }
  };
}

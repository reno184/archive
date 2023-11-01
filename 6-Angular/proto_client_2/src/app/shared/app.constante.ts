import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstante {
    typeToast = {
        'error': {
            key: 'error',
            color: 'bg-danger',
            title: 'Erreur',
            delay: 4000
        }, 'success': {
            key: 'success',
            color: 'bg-success',
            title: 'Message',
            delay: 2000
        }
    }
    typeStatus = {
        0 : 'Non Lu',
        1 :'Lu',
        2 : 'Archivé'
    }
}

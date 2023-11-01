import {animate, state, style, transition, trigger} from '@angular/animations'

export const slideLeft =
    trigger('slideLeft', [
        state('*', style({position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)'})),
        transition(':enter', [
            style({right: '-400%', backgroundColor: 'rgba(0, 0, 0, 0)'}),
            animate('.5s ease-in-out', style({right: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)'}))
        ]),
        transition(':leave', [
            animate('.5s ease-in-out', style({right: '-400%', backgroundColor: 'rgba(0, 0, 0, 0)'}))
        ])
    ])

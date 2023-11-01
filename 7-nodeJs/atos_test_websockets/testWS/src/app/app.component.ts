import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Socket} from "ngx-socket-io";
import {BehaviorSubject, combineLatest, forkJoin, interval, Observable, of, Subject} from "rxjs";
import {map, mergeMap} from "rxjs/operators";

interface wolf {
    id: string;
    lib: string;
    pos: number;
    active?: boolean;
}

@Component({
    selector: 'app-root',
    template: `
        <div style="height: 100vh; width: 50vw">
            <h1>{{(category$ | async)?.title}}</h1>
            <fieldset>
                <legend>Les lamas</legend>
                <h3>{{lama$ | async}}</h3>
                <button (click)="subscribeLama()">Ecouter</button>
                <button (click)="unSubscribeLama()">Arrêter</button>
            </fieldset>
            <fieldset>
                <legend>Liste des toutous</legend>
                <ul *ngFor="let toutou of toutouArray$ | async">
                    <li>{{toutou}}</li>
                </ul>
                <input type="text" [(ngModel)]="toutouValue" (keyup.enter)="addToutou()" placeholder="Toutou">
                <button (click)="addToutou()">Ajout toutou</button>
            </fieldset>
            <fieldset>
                <legend>Liste des minous</legend>
                <ul *ngFor="let minou of minouArray$ | async">
                    <li>{{minou}}</li>
                </ul>
                <input type="text" [(ngModel)]="minouValue" (keyup.enter)="addMinou()" placeholder="Minou">
                <button (click)="addMinou()">Ajout minou</button>
            </fieldset>
            <fieldset>
                <legend>Wolf</legend>
                <ul *ngFor="let wolf of wolf2$ | async">
                    <li [ngStyle]="{ color : wolf.active ? 'red' : 'blue' }"><a
                            (click)="setActive(wolf)"> {{wolf.lib}} {{wolf.pos}}</a></li>
                </ul>
            </fieldset>
        </div>
    `,
    styles: []
})
export class AppComponent {

    category$: Observable<string>;
    toutouValue: string;
    minouValue: string;
    minouArray$: Observable<string[]>;
    toutouArray$: Observable<string[]>;
    lama$: Observable<string>;
    wolf$: Observable<wolf[]>;
    wolf2$: Observable<wolf[]>;
    wolfArray: string[]
    wolfSubject = new BehaviorSubject<string[]>([])

    constructor(private http: HttpClient, private socket: Socket) {
        this.wolfArray = []
        this.socket.on('connect', () => {
            console.log(this.socket, 'connect');
        });
        this.category$ = this.http.get<string>('server/api/toto')
        this.minouArray$ = this.socket.fromEvent('minouToClient');
        this.toutouArray$ = this.socket.fromEvent('toutouToClient');
        this.lama$ = this.socket.fromEvent('lamaToClient');
        this.wolf$ = interval(5000).pipe(mergeMap(() => of([
                ({id: 'a', lib: 'wolf a', pos: Date.now() / 3} as wolf),
                ({id: 'b', lib: 'wolf b', pos: Date.now() / 4} as wolf),
                ({id: 'c', lib: 'wolf c', pos: Date.now() / 2} as wolf)
            ]
        )))
        this.wolf2$ = combineLatest(this.wolf$, this.wolfSubject).pipe(map(([user, articles]) => user.map(item => {
            item.active = articles.includes(item.id);
            return item
        })))

    }

    addMinou() {
        this.socket.emit('minouToServer', this.minouValue);
        this.minouValue = '';
    }

    addToutou() {
        this.socket.emit('toutouToServer', this.toutouValue);
        this.toutouValue = '';
    }

    unSubscribeLama() {
        this.socket.emit('leaveRoom', this.toutouValue);
    }

    subscribeLama() {
        this.socket.emit('joinRoom', this.toutouValue);
    }

    setActive(wolf: wolf) {
        wolf.active = true;
        this.wolfArray.push(wolf.id)
        this.wolfSubject.next(this.wolfArray)
    }
}

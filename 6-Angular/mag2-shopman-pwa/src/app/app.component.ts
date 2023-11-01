import {Component, OnDestroy} from '@angular/core'
import {environment} from '../environments/environment.development'
import {map, Subscription} from 'rxjs'
import {GlobalStore} from './core/global.store'
import {config} from '../config'

@Component({
    selector: 'app-root',
    template: `
        <div class="h-100 d-flex flex-column position-relative">
            <div class="flex-grow-1">
                <router-outlet></router-outlet>
            </div>
            <div *ngIf="success  !== ''" class="position-absolute  alert alert-success shadow border border-dark"
                 style="right: 20px; bottom: 20px">{{success}}</div>
            <div *ngIf="error  !== ''" class="position-absolute  alert alert-danger shadow border border-dark"
                 style="right: 20px; bottom: 20px">{{error}}</div>
            <small>{{version}}</small>
        </div>
        <router-outlet (activate)="menuDisplay = true" (deactivate)="menuDisplay = false" #outlet_page="outlet"
                       name="menu"></router-outlet>
        <router-outlet name="modal"></router-outlet>
    `,
    styles: []
})
export class AppComponent implements OnDestroy {
    menuDisplay = false
    version: string
    success = ''
    error = ''
    subSuccess = new Subscription()
    subError = new Subscription()

    constructor(private globalStore: GlobalStore) {
        this.version = config.version + ' ' + environment.type
        this.subSuccess = this.globalStore.state$.pipe(map(state => state.success)).subscribe(msg => {
            this.success = msg
        })
        this.subError = this.globalStore.state$.pipe(map(state => state.error)).subscribe(msg => {
            this.error = msg
        })
    }

    ngOnDestroy() {
        this.subSuccess.unsubscribe()
        this.subError.unsubscribe()
    }

}

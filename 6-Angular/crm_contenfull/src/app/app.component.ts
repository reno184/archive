import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {Store} from "@ngrx/store";

@Component({
    selector: 'app-root',
    template: `
        <div class="d-flex flex-column" style="height: 100vh">
            <div class="flex-grow-1">
                <router-outlet></router-outlet>
            </div>
            <small>{{version}}</small>
            <router-outlet name="modal"></router-outlet>
        </div>
        <app-size-detector></app-size-detector>
        <app-blocker></app-blocker>
        <app-error></app-error>
        <app-toast></app-toast>
    `,
    styles: []
})
export class AppComponent {
    version: string;

    constructor(private store: Store<any>) {
        this.version = environment.version;

    }
}

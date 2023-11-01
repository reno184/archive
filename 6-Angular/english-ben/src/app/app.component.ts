import { Component } from '@angular/core';
import {environment} from "../environments/environment.development";

@Component({
    selector: 'app-root',
    template: `
    <div  class="h-100 d-flex flex-column">
        <div class="flex-grow-1">
            <router-outlet></router-outlet>
        </div>
        <small>{{version}}</small>
    </div>
    <router-outlet name="modal" ></router-outlet>
  `,
    styles: []
})
export class AppComponent {
    version: string;
    constructor() {
        this.version = environment.version;
    }
}

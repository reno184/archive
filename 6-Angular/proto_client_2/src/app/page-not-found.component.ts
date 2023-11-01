import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    template: `
        <div style="height: 100vh" class="d-flex align-items-center justify-content-center">
            <h1>Page non trouvée</h1>
        </div>
    `,
    styles: []
})
export class PageNotFoundComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}

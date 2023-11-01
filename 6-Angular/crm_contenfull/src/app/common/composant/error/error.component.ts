import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {hide_error} from "../../../store/root.action";

@Component({
    selector: 'app-error',
    template: `
        <ng-container *ngIf="error$| async as error">
            <div style="background: rgba(255,0,0,.5);height: 100vh;width :100vw; position: fixed;top: 0;"
                 class="d-flex justify-content-center align-items-center">
                <div class="card shadow" style="min-width: 250px">
                    <div class="card-body text-center">
                        <h4 class="text-danger">Error</h4>
                        <pre class="bg-light">{{error.statusText}}</pre>
                        <a (click)="onErrorClick()" role="button" title="fermer">Fermer</a>
                    </div>
                </div>
            </div>
        </ng-container>
    `,
    styles: []
})
export class ErrorComponent implements OnInit {
    error$: Observable<any>;

    constructor(private store: Store<any>) {
        this.error$ = this.store.pipe(select(store => store.root.err));
    }

    ngOnInit(): void {}

    onErrorClick() {
        this.store.dispatch(hide_error())
    }

}

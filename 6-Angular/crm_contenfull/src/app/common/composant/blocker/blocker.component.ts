import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
    selector: 'app-blocker',
    template: `
        <div *ngIf="blocker$| async"
             style="background: rgba(0,0,0,.1);height: 100vh;width :100vw; position: fixed;top: 0;"
             class="d-flex justify-content-center align-items-center">>
        </div>
    `,
    styles: []
})
export class BlockerComponent implements OnInit {
    blocker$: Observable<any>

    constructor(private store: Store<any>) {
        this.blocker$ = this.store.pipe(select(store => store.root.blocker))
    }

    ngOnInit(): void {
    }

}
